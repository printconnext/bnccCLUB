// js/app.js
// ตัวควบคุมหน้าจอหลักและการทำงานแบบ Single Page Application (SPA)

document.addEventListener('DOMContentLoaded', () => {
    // กำหนดสถานะปัจจุบันของแอปพลิเคชัน (App State)
    const state = {
        isLoggedIn: false,
        currentView: 'dashboard',
        currentRole: 'member_admin', // member_admin, welfare_admin, executive
        systemDate: '2026-06-22',     // วันที่จำลองระบบ
        selectedWelfareRecipient: null,
        currentEditingMember: null, // เก็บข้อมูลผู้มีสิทธิ์ที่เลือกตอนทำเรื่องสวัสดิการ { id, type, name, status }
        currentReportTab: 'member_registry'
    };

    // โหลดการตั้งค่าตั้งต้นจากฐานข้อมูล
    const settings = db.getSettings();
    state.systemDate = settings.systemDate;

    // ลิงก์ส่วนประกอบหลักใน DOM
    const DOM = {
        menuItems: document.querySelectorAll('.sidebar-menu .menu-item'),
        pageViews: document.querySelectorAll('.page-view'),
        dateDaySelect: document.getElementById('system-date-day'),
        dateMonthSelect: document.getElementById('system-date-month'),
        dateYearSelect: document.getElementById('system-date-year'),
        headerTitle: document.getElementById('header-view-title'),
        sidebarRole: document.getElementById('sidebar-role-badge'),
        sidebarUser: document.getElementById('sidebar-user-name'),
        loginForm: document.getElementById('login-form'),
        loginScreen: document.getElementById('login-screen'),
        appContainer: document.querySelector('.app-container'),
        btnLogout: document.getElementById('btn-logout')
    };

    // ตรวจจับประวัติการเข้าใช้งานก่อนหน้าในเซสชันเดียวกัน (Session Persistence)
    const savedLogin = sessionStorage.getItem('bncc_logged_in');
    const savedRole = sessionStorage.getItem('bncc_user_role');
    if (savedLogin === 'true' && savedRole) {
        state.isLoggedIn = true;
        state.currentRole = savedRole;
        setTimeout(() => {
            DOM.loginScreen.style.display = 'none';
            DOM.appContainer.style.display = 'flex';
        }, 50);
    }

    // ==========================================================================
    // 1. ระบบจัดการเส้นทาง (Routing) และการสลับหน้าจอ (SPA)
    // ==========================================================================
    function initNavigation() {
        DOM.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                navigateTo(view);
            });
        });

        // จัดการกับการกดปุ่มกลับของเบราว์เซอร์หรือ Hash Change
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(`view-${hash}`)) {
                navigateTo(hash);
            }
        });

        // นำทางหน้าเริ่มต้นตามแฮช (ถ้ามี)
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(`view-${initialHash}`)) {
            navigateTo(initialHash);
        } else {
            navigateTo('dashboard');
        }
    }

    function navigateTo(viewName) {
        state.currentView = viewName;
        window.location.hash = viewName;
        
        // อัปเดตเมนู Active
        DOM.menuItems.forEach(item => {
            if (item.getAttribute('data-view') === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // อัปเดต View หน้าจอที่แสดงผล
        DOM.pageViews.forEach(view => {
            if (view.id === `view-${viewName}`) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // เปลี่ยนหัวเรื่องของ Header
        const titles = {
            dashboard: 'แผงควบคุม (Dashboard)',
            members: 'ทะเบียนสมาชิก (Member Registry)',
            teachers: 'ทะเบียนอาจารย์ (Teacher Registry)',
            fees: 'ระบบค่าบำรุงสมาชิก (Maintenance Fees)',
            welfare: 'ระบบจัดการสวัสดิการ (Welfare System)',
            reports: 'หน้ารายงานข้อมูลและสรุปสำหรับผู้บริหาร',
            settings: 'ตั้งค่าระบบ & เครื่องมือสิทธิ์ฐานข้อมูล'
        };
        DOM.headerTitle.innerText = titles[viewName] || 'ชมรมเพื่อน พ.น.';

        // โหลดข้อมูลเฉพาะของหน้านั้นใหม่
        refreshCurrentView();
    }

    function refreshCurrentView() {
        switch (state.currentView) {
            case 'dashboard':
                updateDashboardStats();
                break;
            case 'members':
                renderMembersTable();
                populateMemberGenFilter();
                break;
            case 'teachers':
                renderTeachersTable();
                break;
            case 'fees':
                renderFeesTab();
                break;
            case 'welfare':
                renderWelfareTab();
                break;
            case 'reports':
                renderReportsTab();
                break;
            case 'settings':
                renderSettingsTab();
                break;
        }
    }

    // ==========================================================================
    // 2. ระบบจัดการสิทธิ์การใช้งาน (Role Permissions) และกลไกย้อนเวลา (System Date)
    // ==========================================================================
    function initRoleAndDateControls() {
        // ฟังก์ชันสร้างตัวเลือกใน dropdown ของระบบจำลองวัน (พ.ศ.)
        function initSystemDateDropdowns() {
            const daySelect = DOM.dateDaySelect;
            const monthSelect = DOM.dateMonthSelect;
            const yearSelect = DOM.dateYearSelect;
            
            if (!daySelect || !monthSelect || !yearSelect) return;

            // ใส่ข้อมูลวัน 1-31
            daySelect.innerHTML = '';
            for (let d = 1; d <= 31; d++) {
                daySelect.innerHTML += `<option value="${String(d).padStart(2, '0')}">${d}</option>`;
            }

            // ใส่ข้อมูลเดือน
            const thaiMonths = [
                { val: '01', name: 'ม.ค.' }, { val: '02', name: 'ก.พ.' },
                { val: '03', name: 'มี.ค.' }, { val: '04', name: 'เม.ย.' },
                { val: '05', name: 'พ.ค.' }, { val: '06', name: 'มิ.ย.' },
                { val: '07', name: 'ก.ค.' }, { val: '08', name: 'ส.ค.' },
                { val: '09', name: 'ก.ย.' }, { val: '10', name: 'ต.ค.' },
                { val: '11', name: 'พ.ย.' }, { val: '12', name: 'ธ.ค.' }
            ];
            monthSelect.innerHTML = thaiMonths.map(m => `<option value="${m.val}">${m.name}</option>`).join('');

            // ใส่ข้อมูลปี พ.ศ. (2560 - 2660)
            yearSelect.innerHTML = '';
            for (let y = 2560; y <= 2660; y++) {
                yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
            }

            // ฟังก์ชันตั้งค่าให้ dropdown ตรงกับวันที่ระบบในปัจจุบัน (state.systemDate ในรูป YYYY-MM-DD)
            window.syncDateDropdownsFromState = function() {
                const parts = state.systemDate.split('-');
                if (parts.length !== 3) return;
                const yearCE = parseInt(parts[0], 10);
                const yearBE = yearCE + 543;
                
                daySelect.value = parts[2];
                monthSelect.value = parts[1];
                yearSelect.value = yearBE.toString();
            };

            function handleDropdownDateChange() {
                const day = daySelect.value;
                const month = monthSelect.value;
                const yearBE = parseInt(yearSelect.value, 10);
                const yearCE = yearBE - 543;
                
                const newDateStr = `${yearCE}-${month}-${day}`;
                
                // ตรวจสอบวันที่มีจริง (เช่น ปัดวันที่ 31 ก.พ. เป็นวันสุดท้ายของเดือน)
                const testDate = new Date(yearCE, parseInt(month, 10) - 1, parseInt(day, 10));
                if (testDate.getMonth() + 1 !== parseInt(month, 10)) {
                    const lastDay = new Date(yearCE, parseInt(month, 10), 0).getDate();
                    daySelect.value = String(lastDay).padStart(2, '0');
                    state.systemDate = `${yearCE}-${month}-${String(lastDay).padStart(2, '0')}`;
                } else {
                    state.systemDate = newDateStr;
                }

                // บันทึกวันที่จำลองลงฐานข้อมูลการตั้งค่า
                const settings = db.getSettings();
                settings.systemDate = state.systemDate;
                db.saveSettings(settings);

                refreshCurrentView();
            }

            daySelect.addEventListener('change', handleDropdownDateChange);
            monthSelect.addEventListener('change', handleDropdownDateChange);
            yearSelect.addEventListener('change', handleDropdownDateChange);
            
            syncDateDropdownsFromState();
        }

        initSystemDateDropdowns();

        // ดักฟังการอัปเดต DB เพื่อสั่งวาดข้อมูลใหม่เสมอ
        window.addEventListener('db_updated', () => {
            refreshCurrentView();
            updateDashboardStats();
        });

        applyRolePermissions();
    }

    function applyRolePermissions() {
        const role = state.currentRole;
        
        // 1. ปุ่มสำหรับการเพิ่มสมาชิก/อาจารย์ (เฉพาะ member_admin, super_admin)
        const btnAddMember = document.getElementById('btn-add-member');
        const btnAddTeacher = document.getElementById('btn-add-teacher');
        
        if (role === 'member_admin' || role === 'super_admin') {
            if (btnAddMember) btnAddMember.style.display = 'inline-flex';
            if (btnAddTeacher) btnAddTeacher.style.display = 'inline-flex';
        } else {
            if (btnAddMember) btnAddMember.style.display = 'none';
            if (btnAddTeacher) btnAddTeacher.style.display = 'none';
        }

        // 2. การควบคุมสิทธิ์เบิกสวัสดิการ (เฉพาะ welfare_admin, member_admin, super_admin)
        const welfareClaimPanel = document.getElementById('welfare-claim-form-panel');
        if (role === 'welfare_admin' || role === 'member_admin' || role === 'super_admin') {
            if (welfareClaimPanel) welfareClaimPanel.style.display = 'block';
        } else {
            if (welfareClaimPanel) welfareClaimPanel.style.display = 'none';
        }
        
        // 3. เมนูจัดการผู้ใช้งาน (อนุญาตให้ทุกคนเข้าได้ แต่ในตารางจะกรองข้อมูลตามสิทธิ์)
        const menuUsers = document.getElementById('menu-users');
        if (menuUsers) {
            menuUsers.style.display = 'block';
        }

        // 4. ปุ่มเพิ่มผู้ใช้ใหม่ (เฉพาะ super_admin และ executive)
        const btnAddUser = document.getElementById('btn-add-user');
        if (btnAddUser) {
            btnAddUser.style.display = (role === 'super_admin' || role === 'executive') ? 'inline-flex' : 'none';
        }
    }

    // ==========================================================================
    // 3. ฟังก์ชันการคำนวณและตัวชี้วัดหน้าจอแดชบอร์ด (Dashboard Engine)
    // ==========================================================================
    function updateDashboardStats() {
        const members = db.getMembers();
        const teachers = db.getTeachers();
        const welfares = db.getWelfares();

        let totalMembers = members.length;
        let activeCount = 0;
        let activeNewCount = 0;
        let graceCount = 0;
        let suspendedCount = 0;
        let terminatedCount = 0;
        let deceasedCount = 0;
        
        let unpaidCount = 0;

        members.forEach(m => {
            const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);
            switch (statusInfo.statusKey) {
                case 'active': activeCount++; break;
                case 'active_new': activeNewCount++; break;
                case 'grace_period': graceCount++; break;
                case 'suspended': suspendedCount++; break;
                case 'terminated': terminatedCount++; break;
                case 'deceased': deceasedCount++; break;
            }

            // นับจำนวนผู้ค้างชำระ (เฉพาะ Active/Grace Period)
            if (statusInfo.statusKey === 'grace_period') {
                unpaidCount++;
            }
        });

        // อัปเดตตัวเลขหน้าแดชบอร์ด
        document.getElementById('stat-total-members').innerText = totalMembers;
        document.getElementById('stat-active-members').innerText = activeCount + activeNewCount;
        document.getElementById('stat-grace-members').innerText = unpaidCount;
        document.getElementById('stat-suspended-members').innerText = suspendedCount + terminatedCount;
        document.getElementById('stat-total-teachers').innerText = teachers.length;
        
        // ยอดรวมสวัสดิการสะสม
        const totalWelfareAmount = welfares.reduce((sum, item) => sum + item.amount, 0);
        document.getElementById('stat-total-welfare').innerText = totalWelfareAmount.toLocaleString('th-TH');

        // วาดกราฟสรุปสถานะสมาชิกเป็นวงกลม SVG
        drawDashboardChart(activeCount, activeNewCount, graceCount, suspendedCount, terminatedCount, deceasedCount);
        
        // ดึงรายการประเด็นแจ้งเตือนด่วนของระบบ
        renderDashboardAlerts(members, teachers);
    }

    function drawDashboardChart(active, activeNew, grace, suspended, terminated, deceased) {
        const pieSvg = document.getElementById('dashboard-pie-chart');
        const legendDiv = document.getElementById('pie-chart-legend');
        pieSvg.innerHTML = '';
        legendDiv.innerHTML = '';

        const data = [
            { label: 'Active', val: active, color: '#10b981' },
            { label: 'Active New', val: activeNew, color: '#06b6d4' },
            { label: 'Grace Period', val: grace, color: '#f59e0b' },
            { label: 'Suspended', val: suspended, color: '#ef4444' },
            { label: 'Terminated', val: terminated, color: '#7f1d1d' },
            { label: 'Deceased', val: deceased, color: '#6b7280' }
        ].filter(d => d.val > 0); // กรองเอาเฉพาะข้อมูลที่มีจำนวนสมาชิก > 0

        const total = data.reduce((sum, item) => sum + item.val, 0);
        
        if (total === 0) {
            pieSvg.innerHTML = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="14" transform="rotate(90, 125, 125)">ไม่มีข้อมูล</text>`;
            return;
        }

        let accumulatedPercent = 0;
        
        // สร้าง Donut chart โดยการซ้อนวงกลมและใช้ stroke-dasharray
        data.forEach(slice => {
            const percent = slice.val / total;
            const strokeDash = percent * 100;
            const strokeOffset = 100 - accumulatedPercent;

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "125");
            circle.setAttribute("cy", "125");
            circle.setAttribute("r", "80");
            circle.setAttribute("fill", "transparent");
            circle.setAttribute("stroke", slice.color);
            circle.setAttribute("stroke-width", "28");
            circle.setAttribute("stroke-dasharray", `${strokeDash} 100`);
            circle.setAttribute("stroke-dashoffset", `${strokeOffset}`);
            circle.style.transition = 'all 0.5s ease';
            
            // เอฟเฟ็กต์ชี้เมาส์
            circle.innerHTML = `<title>${slice.label}: ${slice.val} คน (${Math.round(percent*100)}%)</title>`;
            pieSvg.appendChild(circle);

            accumulatedPercent += strokeDash;

            // สร้างป้ายกำกับ
            const legendItem = document.createElement('div');
            legendItem.style.display = 'flex';
            legendItem.style.alignItems = 'center';
            legendItem.style.gap = '8px';
            legendItem.innerHTML = `
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${slice.color};"></span>
                <strong>${slice.label}:</strong> ${slice.val} คน (${Math.round(percent*100)}%)
            `;
            legendDiv.appendChild(legendItem);
        });

        // วงกลมตรงกลางเพื่อทำให้เป็นโดนัทสวยๆ
        const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        innerCircle.setAttribute("cx", "125");
        innerCircle.setAttribute("cy", "125");
        innerCircle.setAttribute("r", "56");
        innerCircle.setAttribute("fill", "var(--bg-secondary)");
        pieSvg.appendChild(innerCircle);

        // ข้อความสรุปตรงกลาง
        const textCount = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textCount.setAttribute("x", "125");
        textCount.setAttribute("y", "120");
        textCount.setAttribute("text-anchor", "middle");
        textCount.setAttribute("fill", "var(--text-primary)");
        textCount.setAttribute("font-size", "22");
        textCount.setAttribute("font-weight", "bold");
        textCount.setAttribute("transform", "rotate(90, 125, 125)");
        textCount.innerText = total;
        pieSvg.appendChild(textCount);

        const textLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textLabel.setAttribute("x", "125");
        textLabel.setAttribute("y", "142");
        textLabel.setAttribute("text-anchor", "middle");
        textLabel.setAttribute("fill", "var(--text-secondary)");
        textLabel.setAttribute("font-size", "10");
        textLabel.setAttribute("transform", "rotate(90, 125, 125)");
        textLabel.innerText = "สมาชิกทั้งหมด";
        pieSvg.appendChild(textLabel);
    }

    function renderDashboardAlerts(members, teachers) {
        const container = document.getElementById('dashboard-alerts');
        container.innerHTML = '';

        const alerts = [];

        members.forEach(m => {
            const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);
            
            // 1. ตรวจสอบสมาชิกที่มีสถานะเป็น Grace Period (ต้องการต่ออายุด่วน)
            if (statusInfo.statusKey === 'grace_period') {
                alerts.push({
                    type: 'warning',
                    title: `แจ้งเตือนต่ออายุ: ${m.name} (${m.id})`,
                    desc: `สมาชิกเกินกำหนดรอบชำระมาแล้ว ${statusInfo.overdueDays} วัน (อยู่ในช่วงผ่อนปรน 30 วัน)`,
                    btnText: 'บันทึกต่ออายุ',
                    action: () => openPaymentConfirmModal(m.id)
                });
            }
            
            // 2. ตรวจสอบสมาชิกที่กำลังจะโดนระงับสิทธิ์ (ค้างชำระเลยกำหนด)
            if (statusInfo.statusKey === 'suspended') {
                alerts.push({
                    type: 'danger',
                    title: `ระงับสิทธิ์ชั่วคราว: ${m.name} (${m.id})`,
                    desc: `ค้างชำระค่าบำรุงมาแล้ว ${statusInfo.overdueDays} วัน (ระงับสิทธิ์การเบิกสวัสดิการ)`,
                    btnText: 'บันทึกต่ออายุ',
                    action: () => openPaymentConfirmModal(m.id)
                });
            }
        });

        // 3. ตรวจสอบว่าในรอบปีปัจจุบัน มีสวัสดิการเกินจำนวนครั้งหรือวงเงินใกล้เต็มไหม
        // (ไม่มีเงื่อนไขหนักหน่วงแสดงที่นี่ ดึงข้อมูลแจ้งเตือนเฉพาะวิกฤตความล่าช้าชำระเงิน)
        
        if (alerts.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:30px; color:var(--text-muted);">
                    <i class="fa-solid fa-circle-check" style="font-size:2.5rem; color:var(--status-active); margin-bottom:12px;"></i>
                    <p>ระบบทำงานเป็นปกติ ไม่พบรายการแจ้งเตือนค้างชำระที่วิกฤต</p>
                </div>
            `;
            return;
        }

        // แสดงผลรายการแจ้งเตือนด่วน
        alerts.slice(0, 5).forEach(alert => {
            const div = document.createElement('div');
            div.className = `alert-item ${alert.type}`;
            
            const textPart = document.createElement('div');
            textPart.className = 'alert-text';
            textPart.innerHTML = `<h4>${alert.title}</h4><p>${alert.desc}</p>`;
            
            div.appendChild(textPart);

            // ถ้ามีสิทธิ์ และมีฟังก์ชัน Action ให้แสดงปุ่ม
            if (alert.action && state.currentRole === 'member_admin') {
                const btn = document.createElement('button');
                btn.className = 'alert-action-btn';
                btn.innerText = alert.btnText;
                btn.addEventListener('click', alert.action);
                div.appendChild(btn);
            }

            container.appendChild(div);
        });
    }

    // ==========================================================================
    // 4. หน้าจอสมาชิก (Member Registry Operations)
    // ==========================================================================
    const memberSearch = document.getElementById('member-search-input');
    const memberFilterStatus = document.getElementById('member-filter-status');
    const memberFilterGen = document.getElementById('member-filter-gen');

    memberSearch.addEventListener('input', renderMembersTable);
    memberFilterStatus.addEventListener('change', renderMembersTable);
    memberFilterGen.addEventListener('change', renderMembersTable);

    function populateMemberGenFilter() {
        const members = db.getMembers();
        const gens = [...new Set(members.map(m => m.generation))].sort((a, b) => a - b);
        
        // เก็บค่าเดิมที่เลือกไว้
        const selectedVal = memberFilterGen.value;
        memberFilterGen.innerHTML = '<option value="all">ทุกรุ่นการศึกษา</option>';
        
        gens.forEach(gen => {
            const opt = document.createElement('option');
            opt.value = gen;
            opt.innerText = `รุ่น พ.น. ${gen}`;
            if (String(gen) === selectedVal) opt.selected = true;
            memberFilterGen.appendChild(opt);
        });
    }

    function renderMembersTable() {
        const body = document.getElementById('members-table-body');
        body.innerHTML = '';

        const searchVal = memberSearch.value ? memberSearch.value.toLowerCase().trim() : '';
        const statusFilter = memberFilterStatus.value;
        const genFilter = memberFilterGen.value;

        const members = db.getMembers();
        const role = state.currentRole;

        const filtered = members.filter(m => {
            // คำนวณสถานะระบบเรียลไทม์
            const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);
            
            // คัดกรอง ค้นหาคำค้นหลัก
            const matchesSearch = m.name.toLowerCase().includes(searchVal) ||
                                  m.id.toLowerCase().includes(searchVal) ||
                                  (m.nickname && m.nickname.toLowerCase().includes(searchVal)) ||
                                  String(m.generation).includes(searchVal);
            
            // คัดกรองสถานะ
            const matchesStatus = statusFilter === 'all' || statusInfo.statusKey === statusFilter;
            
            // คัดกรองรุ่น
            const matchesGen = genFilter === 'all' || String(m.generation) === genFilter;

            return matchesSearch && matchesStatus && matchesGen;
        });

        if (filtered.length === 0) {
            body.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:30px;">ไม่พบข้อมูลสมาชิกในระบบที่ตรงตามเงื่อนไข</td></tr>`;
            return;
        }

        filtered.forEach(m => {
            const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);
            const tr = document.createElement('tr');
            
            // สีประจำตัวตามสิทธิ์สถานะสมาชิก
            let badgeClass = 'badge-active';
            switch (statusInfo.statusKey) {
                case 'active': badgeClass = 'badge-active'; break;
                case 'active_new': badgeClass = 'badge-active-new'; break;
                case 'grace_period': badgeClass = 'badge-grace'; break;
                case 'suspended': badgeClass = 'badge-suspended'; break;
                case 'terminated': badgeClass = 'badge-terminated'; break;
                case 'deceased': badgeClass = 'badge-deceased'; break;
            }

            // รูปโปรไฟล์ประกอบ
            const avatarHtml = m.photo 
                ? `<img src="${m.photo}" class="member-avatar" alt="profile">`
                : `<div class="avatar-placeholder">${m.nickname ? m.nickname.charAt(0) : m.name.charAt(3)}</div>`;

            // การจัดการสิทธิ์ปุ่มแก้ไขตามบทบาท
            const canEdit = (role === 'member_admin');
            const editBtnHtml = canEdit 
                ? `<button class="icon-btn" onclick="openMemberEditModal('${m.id}')" title="แก้ไขข้อมูล"><i class="fa-solid fa-pen-to-square"></i></button>`
                : '';

            tr.innerHTML = `
                <td>${avatarHtml}</td>
                <td><strong>${m.id}</strong></td>
                <td>${m.name} ${m.nickname ? `(${m.nickname})` : ''}</td>
                <td>รุ่น พ.น. ${m.generation}</td>
                <td>${formatCEToBEDate(m.applyDate)}</td>
                <td>${formatCEToBEDate(statusInfo.renewalDueDate)}</td>
                <td><span class="badge ${badgeClass}">${statusInfo.statusText}</span></td>
                <td>
                    <div class="actions-cell">
                        <button class="icon-btn" onclick="viewMemberDetail('${m.id}')" title="รายละเอียดเจาะลึก"><i class="fa-solid fa-circle-info"></i></button>
                        ${editBtnHtml}
                    </div>
                </td>
            `;
            body.appendChild(tr);
        });
    }

    // ==========================================================================
    // 5. หน้าทะเบียนอาจารย์ (Teacher Registry Operations)
    // ==========================================================================
    const teacherSearch = document.getElementById('teacher-search-input');
    const teacherFilterStatus = document.getElementById('teacher-filter-status');

    teacherSearch.addEventListener('input', renderTeachersTable);
    teacherFilterStatus.addEventListener('change', renderTeachersTable);

    function renderTeachersTable() {
        const body = document.getElementById('teachers-table-body');
        body.innerHTML = '';

        const searchVal = teacherSearch.value.toLowerCase().trim();
        const statusFilter = teacherFilterStatus.value;

        const teachers = db.getTeachers();
        const role = state.currentRole;

        const filtered = teachers.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchVal) || 
                                  (t.notes && t.notes.toLowerCase().includes(searchVal));
            const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        if (filtered.length === 0) {
            body.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:30px;">ไม่พบข้อมูลอาจารย์ในระบบ</td></tr>`;
            return;
        }

        filtered.forEach(t => {
            const tr = document.createElement('tr');
            
            let statusText = 'ยังสอนปกติ';
            let badgeClass = 'badge-active';
            if (t.status === 'retired') {
                statusText = 'เกษียณอายุ';
                badgeClass = 'badge-grace';
            } else if (t.status === 'deceased') {
                statusText = 'ถึงแก่กรรม';
                badgeClass = 'badge-deceased';
            }

            const canEdit = (role === 'member_admin');
            const editBtnHtml = canEdit 
                ? `<button class="icon-btn" onclick="openTeacherEditModal('${t.id}')" title="แก้ไขข้อมูล"><i class="fa-solid fa-pen-to-square"></i></button>`
                : '';

            tr.innerHTML = `
                <td><strong>${t.id}</strong></td>
                <td>${t.name}</td>
                <td>${t.phone || '-'}</td>
                <td>${t.address || '-'}</td>
                <td><span class="badge ${badgeClass}">${statusText}</span></td>
                <td><small style="color:var(--text-secondary);">${t.notes || '-'}</small></td>
                <td>
                    <div class="actions-cell">
                        ${editBtnHtml}
                    </div>
                </td>
            `;
            body.appendChild(tr);
        });
    }

    // ==========================================================================
    // 6. แท็บระบบบริหารค่าบำรุงและประวัติ (Maintenance Fees Operations)
    // ==========================================================================
    const feeMemberSearch = document.getElementById('fee-member-search');
    feeMemberSearch.addEventListener('input', renderFeesTab);

    function renderFeesTab() {
        const members = db.getMembers();
        const fees = db.getFees();
        const role = state.currentRole;

        // 1. เรนเดอร์รายการสมาชิกค้างชำระ (Overdue)
        const unpaidBody = document.getElementById('unpaid-members-body');
        unpaidBody.innerHTML = '';
        
        let unpaidCount = 0;
        members.forEach(m => {
            const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);
            if (statusInfo.statusKey === 'grace_period') {
                unpaidCount++;
                const tr = document.createElement('tr');
                
                const btnPayHtml = (role === 'member_admin')
                    ? `<button class="btn btn-success" style="padding:4px 8px; font-size:0.75rem;" onclick="openPaymentConfirmModal('${m.id}')"><i class="fa-solid fa-money-bill-wave"></i> ชำระเงิน</button>`
                    : `<span style="font-size:0.75rem; color:var(--text-muted);">ไม่มีสิทธิ์แก้ไข</span>`;

                tr.innerHTML = `
                    <td><strong>${m.id}</strong></td>
                    <td>${m.name}</td>
                    <td><span style="color:var(--status-grace); font-weight:500;">${formatCEToBEDate(statusInfo.renewalDueDate)}</span></td>
                    <td><span style="color:var(--status-suspended); font-weight:600;">${statusInfo.overdueDays}</span></td>
                    <td>${btnPayHtml}</td>
                `;
                unpaidBody.appendChild(tr);
            }
        });

        if (unpaidCount === 0) {
            unpaidBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:16px;">ไม่มีสมาชิกค้างชำระค่าบำรุงในระบบ</td></tr>`;
        }

        // 2. เรนเดอร์ประวัติการรับชำระเงินล่าสุด
        const paymentBody = document.getElementById('payment-logs-body');
        paymentBody.innerHTML = '';
        
        // เรียงจากประวัติล่าสุดขึ้นก่อน
        const sortedFees = [...fees].sort((a, b) => b.paymentDate.localeCompare(a.paymentDate));
        
        if (sortedFees.length === 0) {
            paymentBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:16px;">ยังไม่มีข้อมูลประวัติธุรกรรมชำระเงิน</td></tr>`;
        } else {
            sortedFees.slice(0, 30).forEach(log => {
                const member = members.find(m => m.id === log.memberId);
                const memberName = member ? member.name : 'ไม่พบชื่อในระบบ';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${formatCEToBEDate(log.paymentDate)}</td>
                    <td><strong>${log.memberId}</strong></td>
                    <td>${memberName}</td>
                    <td>งวดปี ${log.year + 543}</td>
                    <td>${log.amount} บาท</td>
                    <td><small style="color:var(--text-muted);">${log.recordedBy || 'ระบบ'}</small></td>
                `;
                paymentBody.appendChild(tr);
            });
        }

        // 3. เรนเดอร์การค้นหาสมาชิกสำหรับการชำระเงินด่วน (Quick Pay Table)
        const quickPayBody = document.getElementById('fee-quick-pay-body');
        quickPayBody.innerHTML = '';

        const searchVal = feeMemberSearch.value.toLowerCase().trim();
        
        // แสดงรายชื่อทั้งหมด หรือตามคำค้น
        const filteredMembers = members.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchVal) ||
                                  m.id.toLowerCase().includes(searchVal) ||
                                  (m.nickname && m.nickname.toLowerCase().includes(searchVal)) ||
                                  String(m.generation).includes(searchVal);
            return matchesSearch && m.status !== 'deceased';
        });

        if (filteredMembers.length === 0) {
            quickPayBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:20px;">ไม่พบรายชื่อสมาชิกเพื่อรับชำระเงินด่วน</td></tr>`;
            return;
        }

        const displayLimit = searchVal ? 100 : 10;
        filteredMembers.slice(0, displayLimit).forEach(m => {
            const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);
            const tr = document.createElement('tr');
            
            let badgeClass = 'badge-active';
            switch (statusInfo.statusKey) {
                case 'active': badgeClass = 'badge-active'; break;
                case 'active_new': badgeClass = 'badge-active-new'; break;
                case 'grace_period': badgeClass = 'badge-grace'; break;
                case 'suspended': badgeClass = 'badge-suspended'; break;
                case 'terminated': badgeClass = 'badge-terminated'; break;
            }

            const btnPayHtml = (role === 'member_admin')
                ? `<button class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="openPaymentConfirmModal('${m.id}')"><i class="fa-solid fa-receipt"></i> บันทึกรับเงิน</button>`
                : `<span style="font-size:0.8rem; color:var(--text-muted);">-</span>`;

            tr.innerHTML = `
                <td><strong>${m.id}</strong></td>
                <td>${m.name} ${m.nickname ? `(${m.nickname})` : ''}</td>
                <td>รุ่น พ.น. ${m.generation}</td>
                <td>${m.lastPaymentDate ? formatCEToBEDate(m.lastPaymentDate) : 'ไม่มีประวัติ'}</td>
                <td>${formatCEToBEDate(statusInfo.renewalDueDate)}</td>
                <td><span class="badge ${badgeClass}">${statusInfo.statusText}</span></td>
                <td>${btnPayHtml}</td>
            `;
            quickPayBody.appendChild(tr);
        });
    }

    // ==========================================================================
    // 7. แท็บระบบทำเรื่องขออนุมัติและประวัติสวัสดิการ (Welfare Claim Operations)
    // ==========================================================================
    const welfareSearchInput = document.getElementById('welfare-search-recipient');
    const welfareSearchResults = document.getElementById('welfare-search-results');
    const welfareTypeSelect = document.getElementById('welfare-type-select');
    const welfareAmountInput = document.getElementById('welfare-amount-input');
    const welfareClaimForm = document.getElementById('welfare-claim-form');
    const welfareLogSearch = document.getElementById('welfare-log-search');
    const welfareFilterType = document.getElementById('welfare-filter-type');

    welfareSearchInput.addEventListener('input', handleWelfareRecipientSearch);
    welfareTypeSelect.addEventListener('change', handleWelfareTypeChange);
    welfareLogSearch.addEventListener('input', renderWelfareTab);
    welfareFilterType.addEventListener('change', renderWelfareTab);
    
    // ตั้งค่าปุ่มยกเลิกเคลมสวัสดิการ
    document.getElementById('welfare-form-cancel').addEventListener('click', resetWelfareClaimForm);

    function handleWelfareRecipientSearch() {
        const query = welfareSearchInput.value.toLowerCase().trim();
        if (!query) {
            welfareSearchResults.style.display = 'none';
            return;
        }

        const members = db.getMembers();
        const teachers = db.getTeachers();

        const filteredMembers = members.filter(m => m.name.toLowerCase().includes(query) || m.id.toLowerCase().includes(query));
        const filteredTeachers = teachers.filter(t => t.name.toLowerCase().includes(query) || t.id.toLowerCase().includes(query));

        welfareSearchResults.innerHTML = '';
        
        let count = 0;

        // แสดงผลรวม
        filteredMembers.slice(0, 5).forEach(m => {
            const div = document.createElement('div');
            div.style.padding = '8px 12px';
            div.style.cursor = 'pointer';
            div.style.borderBottom = '1px solid var(--border-color)';
            div.innerHTML = `<strong>${m.name}</strong> <span style="font-size:0.75rem; color:var(--accent-cyan);">(สมาชิก - ${m.id})</span>`;
            div.addEventListener('click', () => selectWelfareRecipient(m, 'member'));
            welfareSearchResults.appendChild(div);
            count++;
        });

        filteredTeachers.slice(0, 5).forEach(t => {
            const div = document.createElement('div');
            div.style.padding = '8px 12px';
            div.style.cursor = 'pointer';
            div.style.borderBottom = '1px solid var(--border-color)';
            div.innerHTML = `<strong>${t.name}</strong> <span style="font-size:0.75rem; color:var(--accent-indigo);">(อาจารย์ - ${t.id})</span>`;
            div.addEventListener('click', () => selectWelfareRecipient(t, 'teacher'));
            welfareSearchResults.appendChild(div);
            count++;
        });

        if (count > 0) {
            welfareSearchResults.style.display = 'block';
        } else {
            welfareSearchResults.innerHTML = `<div style="padding:8px 12px; color:var(--text-muted); font-size:0.8rem;">ไม่พบข้อมูลชื่อสมาชิกหรืออาจารย์</div>`;
            welfareSearchResults.style.display = 'block';
        }
    }

    function selectWelfareRecipient(recipient, type) {
        state.selectedWelfareRecipient = {
            id: recipient.id,
            type: type,
            name: recipient.name,
            original: recipient
        };

        welfareSearchInput.value = recipient.name;
        welfareSearchResults.style.display = 'none';

        // แสดงข้อมูลผู้ได้รับที่เลือกไว้บน UI
        const infoCard = document.getElementById('selected-recipient-card');
        
        if (type === 'member') {
            const statusInfo = MembershipEngine.calculateMemberStatus(recipient, state.systemDate);
            infoCard.innerHTML = `
                <div style="display:flex; justify-content:between; align-items:center;">
                    <div>
                        <strong>${recipient.name}</strong> (${recipient.id}) - รุ่น พ.น. ${recipient.generation}<br>
                        <span style="font-size:0.75rem; color:var(--text-secondary);">วันที่สมัคร: ${recipient.applyDate} | ชำระเงินล่าสุด: ${recipient.lastPaymentDate}</span>
                    </div>
                    <span class="badge badge-active" style="margin-left:auto;">${statusInfo.statusText}</span>
                </div>
            `;
            state.selectedWelfareRecipient.status = statusInfo.statusKey;
        } else {
            let statusText = 'ปัจจุบันยังสอน';
            if (recipient.status === 'retired') statusText = 'เกษียณอายุ';
            if (recipient.status === 'deceased') statusText = 'ถึงแก่กรรม';

            infoCard.innerHTML = `
                <div style="display:flex; justify-content:between; align-items:center;">
                    <div>
                        <strong>${recipient.name}</strong> (${recipient.id}) - ทะเบียนอาจารย์<br>
                        <span style="font-size:0.75rem; color:var(--text-secondary);">${recipient.notes || '-'}</span>
                    </div>
                    <span class="badge badge-grace" style="margin-left:auto;">${statusText}</span>
                </div>
            `;
            state.selectedWelfareRecipient.status = recipient.status;
        }

        // เปิดตัวเลือกประเภทสวัสดิการ
        populateWelfareTypes(type);
        document.getElementById('welfare-verification-panel').style.display = 'block';
        document.getElementById('welfare-input-fields').style.display = 'block';
        
        // เลือกประเภทสวัสดิการตัวแรกเป็นตั้งต้นและเช็คความถูกต้อง
        handleWelfareTypeChange();
    }

    function populateWelfareTypes(recipientType) {
        welfareTypeSelect.innerHTML = '';
        if (recipientType === 'member') {
            welfareTypeSelect.innerHTML = `
                <option value="member_medical">เยี่ยมไข้เจ็บป่วยพักรักษาตัว (สูงสุด 1,500 บาท, ไม่เกิน 2 ครั้ง/ปี)</option>
                <option value="family_deceased">ครอบครัวสมาชิกถึงแก่กรรม (สูงสุด 2,000 บาท)</option>
                <option value="member_deceased">สมาชิกถึงแก่กรรม (สูงสุด 5,000 บาท)</option>
            `;
        } else {
            welfareTypeSelect.innerHTML = `
                <option value="teacher_medical">เยี่ยมไข้เจ็บป่วยพักรักษาตัวอาจารย์ (สูงสุด 2,000 บาท, ไม่เกิน 1 ครั้ง/ปี)</option>
                <option value="teacher_deceased">อาจารย์ถึงแก่กรรม (สูงสุด 2,000 บาท)</option>
            `;
        }
    }

    function handleWelfareTypeChange() {
        if (!state.selectedWelfareRecipient) return;

        const type = state.selectedWelfareRecipient.type;
        const recipientId = state.selectedWelfareRecipient.id;
        const welfareType = welfareTypeSelect.value;
        const systemDateStr = state.systemDate;
        
        // ตั้งค่าวันที่เคลมสวัสดิการเริ่มต้นเป็นวันที่จำลองในวันนี้
        setDateDropdowns('welfare-claim', systemDateStr);

        const welfaresList = db.getWelfares();
        const recipient = state.selectedWelfareRecipient.original;

        // เรียกตรวจสอบความเข้ากันได้ของข้อมูล
        const verdict = MembershipEngine.checkWelfareEligibility(
            recipient,
            type,
            welfareType,
            systemDateStr,
            welfaresList,
            systemDateStr
        );

        const verdictDiv = document.getElementById('welfare-verdict-display');
        const historyInfoDiv = document.getElementById('welfare-history-check-info');
        const amountHint = document.getElementById('welfare-amount-hint');

        if (verdict.eligible) {
            verdictDiv.className = 'checker-status-display eligible';
            verdictDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> ผ่านการประเมิน: สิทธิ์การเบิกสวัสดิการ [พร้อมอนุมัติ] ยอดเงินไม่เกิน ${verdict.maxAmount} บาท`;
            
            historyInfoDiv.innerHTML = verdict.note || 'ผ่านเกณฑ์ตรวจสอบจำนวนครั้งและรอบกำหนดเวลาชำระเงินตามกติกาชมรม';
            
            welfareAmountInput.value = verdict.maxAmount;
            welfareAmountInput.max = verdict.maxAmount;
            welfareAmountInput.disabled = false;
            amountHint.innerText = `* จำนวนเงินระบุเบิกได้สูงสุดไม่เกิน ${verdict.maxAmount} บาท`;
            document.getElementById('welfare-form-submit').disabled = false;
        } else {
            verdictDiv.className = 'checker-status-display ineligible';
            verdictDiv.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ถูกปฏิเสธ/ระงับอนุมัติ: ${verdict.reason}`;
            
            historyInfoDiv.innerHTML = `<span style="color:#ef4444;">ระบบตรวจสอบพบว่าไม่เข้าเกณฑ์เงื่อนไขในการจ่ายเงินช่วยเหลือสมาคม</span>`;
            
            welfareAmountInput.value = 0;
            welfareAmountInput.disabled = true;
            amountHint.innerText = `* สมาชิกไม่สามารถเบิกได้เนื่องจากไม่ผ่านเงื่อนไข`;
            document.getElementById('welfare-form-submit').disabled = true;
        }
    }

    function resetWelfareClaimForm() {
        welfareSearchInput.value = '';
        document.getElementById('selected-recipient-card').innerHTML = `<span style="color:var(--text-muted);">ยังไม่ได้เลือกผู้ขอรับสวัสดิการ</span>`;
        document.getElementById('welfare-verification-panel').style.display = 'none';
        document.getElementById('welfare-input-fields').style.display = 'none';
        welfareSearchResults.style.display = 'none';
        state.selectedWelfareRecipient = null;
        welfareClaimForm.reset();
    }

    // จัดการการส่งฟอร์มขอเบิกสวัสดิการ
    welfareClaimForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!state.selectedWelfareRecipient) return;

        const recipientId = state.selectedWelfareRecipient.id;
        const recipientType = state.selectedWelfareRecipient.type;
        const welfareType = welfareTypeSelect.value;
        const amount = parseInt(welfareAmountInput.value);
        const claimDate = getDateFromDropdowns('welfare-claim');
        const details = document.getElementById('welfare-details-input').value;

        // ดึงขีดจำกัดความเหมาะสมสูงสุดอีกครั้งเพื่อความปลอดภัย
        const welfaresList = db.getWelfares();
        const recipient = state.selectedWelfareRecipient.original;
        const verdict = MembershipEngine.checkWelfareEligibility(
            recipient,
            recipientType,
            welfareType,
            claimDate,
            welfaresList,
            state.systemDate
        );

        if (!verdict.eligible) {
            alert(`ไม่สามารถทำเบิกได้: ${verdict.reason}`);
            return;
        }

        if (amount > verdict.maxAmount) {
            alert(`ไม่สามารถทำเบิกได้เนื่องจากป้อนจำนวนเงิน ${amount} บาท เกินวงเงินสูงสุดที่สามารถเบิกได้จริง (${verdict.maxAmount} บาท)`);
            return;
        }

        // ยืนยันข้อมูลสมาชิกเสียชีวิตเพื่อปิดใช้งานสถานะสมาชิกทันที
        let updateStatusToDeceased = false;
        if (welfareType === 'member_deceased') {
            if (confirm("แจ้งเตือน: การยืนยันสวัสดิการสมาชิกถึงแก่กรรมจะปรับเปลี่ยนสถานะของสมาชิกคนนี้เป็น 'ถึงแก่กรรม' และปิดการใช้งานข้อมูลถาวร ยืนยันการดำเนินการ?")) {
                updateStatusToDeceased = true;
            } else {
                return;
            }
        }

        if (welfareType === 'teacher_deceased') {
            if (confirm("แจ้งเตือน: จะปรับเปลี่ยนสถานะของอาจารย์ท่านนี้เป็น 'ถึงแก่กรรม' ยืนยันการดำเนินการ?")) {
                updateStatusToDeceased = true;
            } else {
                return;
            }
        }

        const newWelfare = {
            id: `W${String(welfaresList.length + 1).padStart(3, '0')}`,
            recipientId: recipientId,
            recipientType: recipientType,
            welfareType: welfareType,
            claimDate: claimDate,
            amount: amount,
            details: details,
            recordedBy: state.currentRole === 'welfare_admin' ? 'ผู้ดูแลสวัสดิการ' : (state.currentRole === 'member_admin' ? 'ผู้ดูแลทะเบียนสมาชิก' : 'กรรมการระบบ')
        };

        // บันทึกลงฐานข้อมูล
        db.addWelfare(newWelfare);

        // หากเป็นการระบุถึงแก่กรรม ให้อัปเดตข้อมูลตัวสมาชิกด้วย
        if (updateStatusToDeceased) {
            if (recipientType === 'member') {
                recipient.isDeceased = true;
                recipient.status = 'deceased';
                db.updateMember(recipient);
            } else {
                recipient.status = 'deceased';
                db.updateTeacher(recipient);
            }
        }

        alert(`บันทึกการเบิกจ่ายสวัสดิการรหัส ${newWelfare.id} สำเร็จเรียบร้อยแล้ว`);
        resetWelfareClaimForm();
        refreshCurrentView();
    });

    function renderWelfareTab() {
        const body = document.getElementById('welfare-logs-body');
        body.innerHTML = '';

        const searchQuery = welfareLogSearch.value.toLowerCase().trim();
        const typeFilter = welfareFilterType.value;

        const welfares = db.getWelfares();
        const members = db.getMembers();
        const teachers = db.getTeachers();

        const filtered = welfares.filter(w => {
            let name = '';
            if (w.recipientType === 'member') {
                const m = members.find(member => member.id === w.recipientId);
                name = m ? m.name : '';
            } else {
                const t = teachers.find(teacher => teacher.id === w.recipientId);
                name = t ? t.name : '';
            }

            const matchesSearch = name.toLowerCase().includes(searchQuery) || w.details.toLowerCase().includes(searchQuery);
            const matchesType = typeFilter === 'all' || w.welfareType === typeFilter;

            return matchesSearch && matchesType;
        });

        // เรียงประวัติการเบิกจ่ายจากล่าสุดขึ้นก่อน
        const sorted = filtered.sort((a, b) => b.claimDate.localeCompare(a.claimDate));

        if (sorted.length === 0) {
            body.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:30px;">ไม่พบรายการสวัสดิการที่คัดกรองในระบบ</td></tr>`;
            return;
        }

        sorted.forEach(w => {
            let name = '';
            if (w.recipientType === 'member') {
                const m = members.find(member => member.id === w.recipientId);
                name = m ? `${m.name} (รุ่น ${m.generation})` : 'ไม่พบข้อมูล';
            } else {
                const t = teachers.find(teacher => teacher.id === w.recipientId);
                name = t ? t.name : 'ไม่พบข้อมูล';
            }

            const wTypeNames = {
                member_deceased: 'สมาชิกถึงแก่กรรม',
                family_deceased: 'ครอบครัวสมาชิกถึงแก่กรรม',
                member_medical: 'สมาชิกเยี่ยมไข้',
                teacher_deceased: 'อาจารย์ถึงแก่กรรม',
                teacher_medical: 'อาจารย์เยี่ยมไข้'
            };

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatCEToBEDate(w.claimDate)}</td>
                <td><strong>${name}</strong> <small style="color:var(--text-muted); display:block;">รหัส: ${w.recipientId}</small></td>
                <td>${w.recipientType === 'member' ? 'สมาชิกชมรม' : 'อาจารย์'}</td>
                <td><span style="font-weight:600; color:var(--accent-blue);">${wTypeNames[w.welfareType] || w.welfareType}</span></td>
                <td><strong>${w.amount.toLocaleString('th-TH')}</strong> บาท</td>
                <td><small style="color:var(--text-secondary);">${w.details}</small></td>
                <td><small style="color:var(--text-muted);">${w.recordedBy || 'ระบบ'}</small></td>
                <td class="no-print">
                    <button class="icon-btn delete" onclick="deleteWelfareLog('${w.id}')" title="ลบรายการนี้" style="display:${state.currentRole === 'welfare_admin' || state.currentRole === 'member_admin' ? 'inline-flex' : 'none'};"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            body.appendChild(tr);
        });
    }

    // ฟังก์ชันลบรายการจ่ายสวัสดิการ
    window.deleteWelfareLog = function(id) {
        if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการเบิกจ่ายสวัสดิการนี้? การลบนี้จะไม่คืนสถานะเสียชีวิตโดยอัตโนมัติหากทำรายการของสมาชิกเสียชีวิต")) return;
        const welfares = db.getWelfares();
        const updated = welfares.filter(w => w.id !== id);
        db.saveWelfares(updated);
        alert("ลบรายการประวัติเบิกสวัสดิการแล้ว");
        refreshCurrentView();
    };

    // ==========================================================================
    // 8. แท็บระบบออกรายงานและคำสั่งพิมพ์สำหรับงานคณะกรรมการประจำปี (Reports Operations)
    // ==========================================================================
    const reportTabs = document.querySelectorAll('.report-tabs .report-tab-btn');
    reportTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            reportTabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentReportTab = btn.getAttribute('data-report');
            renderReportsTab();
        });
    });

    function renderReportsTab() {
        const controls = document.getElementById('report-controls-container');
        const printTitle = document.getElementById('report-print-title');
        const printDateSpan = document.getElementById('report-print-date');
        const content = document.getElementById('report-preview-content');

        // จัดรูปแบบวันเวลา
        const now = new Date(state.systemDate);
        const formatThaiDate = now.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
        printDateSpan.innerText = formatThaiDate;

        const members = db.getMembers();
        const teachers = db.getTeachers();
        const fees = db.getFees();
        const welfares = db.getWelfares();

        // 1. ล้างเมนูควบคุมฟิลเตอร์รายงาน
        controls.innerHTML = '';

        if (state.currentReportTab === 'member_registry') {
            printTitle.innerText = 'รายงานทะเบียนรายชื่อสมาชิกชมรม';
            
            // ใส่ปุ่มกรองรุ่นและกรองสถานะในหน้ารายงาน
            controls.innerHTML = `
                <select id="report-member-status" class="filter-select">
                    <option value="all">ทุกสถานะสมาชิก</option>
                    <option value="expired">หมดอายุ</option>
                    <option value="active">Active เท่านั้น</option>
                    <option value="unpaid">ค้างชำระทั้งหมด</option>
                    <option value="terminated">สิ้นสภาพแล้ว</option>
                </select>
                <select id="report-member-month" class="filter-select" style="display:none; width:150px;">
                    <option value="all">ทุกเดือน</option>
                    <option value="1">มกราคม</option>
                    <option value="2">กุมภาพันธ์</option>
                    <option value="3">มีนาคม</option>
                    <option value="4">เมษายน</option>
                    <option value="5">พฤษภาคม</option>
                    <option value="6">มิถุนายน</option>
                    <option value="7">กรกฎาคม</option>
                    <option value="8">สิงหาคม</option>
                    <option value="9">กันยายน</option>
                    <option value="10">ตุลาคม</option>
                    <option value="11">พฤศจิกายน</option>
                    <option value="12">ธันวาคม</option>
                </select>
                <input type="number" id="report-member-gen" class="filter-select" placeholder="ระบุรุ่น (ว่าง = ทั้งหมด)" style="width:120px;">
            `;

            // ดักจับเมื่อผู้ใช้เปลี่ยนตัวกรองในหน้ารายงาน
            const statusSel = document.getElementById('report-member-status');
            const monthSel = document.getElementById('report-member-month');
            const genInput = document.getElementById('report-member-gen');
            
            // ตั้งค่าเดือนเริ่มต้นตามวันที่ระบบจำลอง
            const sysDate = new Date(state.systemDate);
            if (!isNaN(sysDate.getTime())) {
                monthSel.value = (sysDate.getMonth() + 1).toString();
            }

            statusSel.addEventListener('change', () => {
                if (statusSel.value === 'expired') {
                    monthSel.style.display = 'inline-block';
                } else {
                    monthSel.style.display = 'none';
                }
                runMemberReport();
            });
            monthSel.addEventListener('change', runMemberReport);
            genInput.addEventListener('input', runMemberReport);

            runMemberReport();

            function runMemberReport() {
                const statusVal = statusSel.value;
                const genVal = genInput.value;
                const monthVal = monthSel.value;

                let filtered = members.map(m => {
                    return { ...m, calculated: MembershipEngine.calculateMemberStatus(m, state.systemDate) };
                });

                if (statusVal === 'active') {
                    filtered = filtered.filter(m => m.calculated.statusKey === 'active' || m.calculated.statusKey === 'active_new');
                } else if (statusVal === 'unpaid') {
                    // เฉพาะ Active (Grace Period) ที่ค้างชำระ
                    filtered = filtered.filter(m => m.calculated.statusKey === 'grace_period');
                } else if (statusVal === 'terminated') {
                    filtered = filtered.filter(m => m.calculated.statusKey === 'terminated');
                } else if (statusVal === 'expired') {
                    filtered = filtered.filter(m => {
                        if (!m.calculated.renewalDueDate) return false;
                        if (m.calculated.statusKey === 'deceased') return false;
                        const dueDate = new Date(m.calculated.renewalDueDate);
                        if (isNaN(dueDate.getTime())) return false;
                        const dueMonth = dueDate.getMonth() + 1;
                        if (monthVal !== 'all' && dueMonth !== parseInt(monthVal)) {
                            return false;
                        }
                        return true;
                    });
                }

                if (genVal) {
                    filtered = filtered.filter(m => String(m.generation) === genVal);
                }

                const isUnpaidReport = statusVal === 'unpaid';

                let html = `
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>รหัสสมาชิก</th>
                                <th>ชื่อ-นามสกุล (ชื่อเล่น)</th>
                                <th>รุ่น พ.น.</th>
                                ${!isUnpaidReport ? `
                                <th>เบอร์โทรศัพท์</th>
                                <th>ที่อยู่ปัจจุบัน</th>
                                ` : ''}
                                <th>ชำระล่าสุด</th>
                                <th>วันครบกำหนดรอบ</th>
                                ${!isUnpaidReport ? `<th>สถานะสมาชิก</th>` : ''}
                            </tr>
                        </thead>
                        <tbody>
                `;

                if (filtered.length === 0) {
                    const colSpan = isUnpaidReport ? 5 : 8;
                    html += `<tr><td colspan="${colSpan}" style="text-align:center; padding:20px;">ไม่พบรายการสมาชิกร่วมในเงื่อนไขการพิมพ์รายงาน</td></tr>`;
                } else {
                    filtered.forEach(m => {
                        html += `
                            <tr>
                                <td><strong>${m.id}</strong></td>
                                <td>${m.name} ${m.nickname ? `(${m.nickname})` : ''}</td>
                                <td>รุ่น ${m.generation}</td>
                                ${!isUnpaidReport ? `
                                <td>${m.phone}</td>
                                <td><small>${m.address || '-'}</small></td>
                                ` : ''}
                                <td>${formatCEToBEDate(m.lastPaymentDate)}</td>
                                <td>${formatCEToBEDate(m.calculated.renewalDueDate)}</td>
                                ${!isUnpaidReport ? `<td><strong>${m.calculated.statusText}</strong></td>` : ''}
                            </tr>
                        `;
                    });
                }

                html += `</tbody></table>`;
                content.innerHTML = html;
            }
        } 
        
        else if (state.currentReportTab === 'teacher_registry') {
            printTitle.innerText = 'รายงานทำเนียบข้อมูลรายชื่ออาจารย์';
            
            controls.innerHTML = `
                <select id="report-teacher-status" class="filter-select">
                    <option value="all">ทุกสถานะอาจารย์</option>
                    <option value="teaching">ปัจจุบันยังสอน</option>
                    <option value="retired">เกษียณอายุ</option>
                    <option value="deceased">ถึงแก่กรรม</option>
                </select>
            `;

            const statusSel = document.getElementById('report-teacher-status');
            statusSel.addEventListener('change', runTeacherReport);
            runTeacherReport();

            function runTeacherReport() {
                const val = statusSel.value;
                let filtered = teachers;

                if (val !== 'all') {
                    filtered = teachers.filter(t => t.status === val);
                }

                let html = `
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>รหัสอาจารย์</th>
                                <th>ชื่อ-นามสกุลอาจารย์</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>ที่อยู่จัดส่งและติดต่อ</th>
                                <th>สถานะปัจจุบัน</th>
                                <th>บันทึกเพิ่มเติม</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                if (filtered.length === 0) {
                    html += `<tr><td colspan="6" style="text-align:center; padding:20px;">ไม่พบข้อมูลอาจารย์ในเงื่อนไข</td></tr>`;
                } else {
                    filtered.forEach(t => {
                        let statusText = 'ยังสอนปกติ';
                        if (t.status === 'retired') statusText = 'เกษียณอายุ';
                        if (t.status === 'deceased') statusText = 'ถึงแก่กรรม';

                        html += `
                            <tr>
                                <td><strong>${t.id}</strong></td>
                                <td>${t.name}</td>
                                <td>${t.phone || '-'}</td>
                                <td>${t.address || '-'}</td>
                                <td><strong>${statusText}</strong></td>
                                <td><small>${t.notes || '-'}</small></td>
                            </tr>
                        `;
                    });
                }

                html += `</tbody></table>`;
                content.innerHTML = html;
            }
        } 
        
        else if (state.currentReportTab === 'maintenance_fees') {
            printTitle.innerText = 'รายงานค่าบำรุงสมาชิกประจำปีและงบประมาณรับ';
            
            // ปีการศึกษา/งวดชำระ
            const years = [...new Set(fees.map(f => f.year))].sort((a, b) => b - a);
            let yearOptions = years.map(y => `<option value="${y}">งวดชำระประจำปี ${y + 543}</option>`).join('');
            
            controls.innerHTML = `
                <select id="report-fee-year" class="filter-select">
                    <option value="all">สรุปยอดรวมทุกงวดปี</option>
                    ${yearOptions}
                </select>
            `;

            const yearSel = document.getElementById('report-fee-year');
            yearSel.addEventListener('change', runFeeReport);
            runFeeReport();

            function runFeeReport() {
                const yearVal = yearSel.value;
                let filteredFees = fees;
                
                if (yearVal !== 'all') {
                    filteredFees = fees.filter(f => String(f.year) === yearVal);
                }

                const totalRevenue = filteredFees.reduce((sum, item) => sum + item.amount, 0);

                let html = `
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:15px; border-radius:6px; margin-bottom:20px; color:#1e293b;">
                        <h4 style="font-size:0.9rem; font-weight:600;">สรุปงบประมาณรับค่าบำรุงชมรม:</h4>
                        <p style="font-size:1.15rem; font-weight:700; color:#0f172a; margin-top:4px;">ยอดรวมรายรับสมาคมสะสม: ${totalRevenue.toLocaleString()} บาท (จำนวนธุรกรรม ${filteredFees.length} รายการ)</p>
                    </div>
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>วันที่ชำระเงิน</th>
                                <th>รหัสสมาชิก</th>
                                <th>ชื่อ-นามสกุลสมาชิก</th>
                                <th>รุ่น พ.น.</th>
                                <th>งวดชำระประจำปี</th>
                                <th>จำนวนเงินที่ชำระ</th>
                                <th>เจ้าหน้าที่ผู้บันทึก</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                if (filteredFees.length === 0) {
                    html += `<tr><td colspan="7" style="text-align:center; padding:20px;">ไม่พบรายการประวัติการรับชำระเงินตามงวดปีที่ระบุ</td></tr>`;
                } else {
                    filteredFees.forEach(f => {
                        const m = members.find(member => member.id === f.memberId);
                        html += `
                            <tr>
                                <td>${formatCEToBEDate(f.paymentDate)}</td>
                                <td><strong>${f.memberId}</strong></td>
                                <td>${m ? m.name : 'ไม่พบข้อมูล'}</td>
                                <td>${m ? `รุ่น ${m.generation}` : '-'}</td>
                                <td>งวดปี ${f.year + 543}</td>
                                <td>${f.amount} บาท</td>
                                <td><small>${f.recordedBy || 'ระบบ'}</small></td>
                            </tr>
                        `;
                    });
                }

                html += `</tbody></table>`;
                content.innerHTML = html;
            }
        } 
        
        else if (state.currentReportTab === 'welfare_summary') {
            printTitle.innerText = 'รายงานประวัติและงบประมาณการเบิกจ่ายสวัสดิการ';
            
            controls.innerHTML = `
                <select id="report-welfare-type" class="filter-select">
                    <option value="all">ทุกประเภทสวัสดิการ</option>
                    <option value="member_deceased">สมาชิกถึงแก่กรรม (5,000 บาท)</option>
                    <option value="family_deceased">ครอบครัวสมาชิกถึงแก่กรรม (2,000 บาท)</option>
                    <option value="member_medical">เยี่ยมไข้สมาชิก (1,500 บาท)</option>
                    <option value="teacher_deceased">อาจารย์ถึงแก่กรรม (2,000 บาท)</option>
                    <option value="teacher_medical">เยี่ยมไข้อาจารย์ (2,000 บาท)</option>
                </select>
            `;

            const typeSel = document.getElementById('report-welfare-type');
            typeSel.addEventListener('change', runWelfareReport);
            runWelfareReport();

            function runWelfareReport() {
                const typeVal = typeSel.value;
                let filtered = welfares;

                if (typeVal !== 'all') {
                    filtered = welfares.filter(w => w.welfareType === typeVal);
                }

                const totalPaid = filtered.reduce((sum, item) => sum + item.amount, 0);

                let html = `
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:15px; border-radius:6px; margin-bottom:20px; color:#1e293b;">
                        <h4 style="font-size:0.9rem; font-weight:600;">สรุปยอดเงินสนับสนุนสวัสดิการสมาชิก/อาจารย์:</h4>
                        <p style="font-size:1.15rem; font-weight:700; color:#0f172a; margin-top:4px;">ยอดรวมเงินสวัสดิการจ่ายออก: ${totalPaid.toLocaleString()} บาท (รวมเบิก ${filtered.length} ครั้ง)</p>
                    </div>
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>วันที่จ่ายเงิน</th>
                                <th>รหัสผู้รับ</th>
                                <th>ชื่อ-นามสกุลผู้รับผลประโยชน์</th>
                                <th>ประเภทบุคคล</th>
                                <th>ประเภทสวัสดิการ</th>
                                <th>ยอดจ่ายจริง</th>
                                <th>รายละเอียดเหตุการณ์</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                if (filtered.length === 0) {
                    html += `<tr><td colspan="7" style="text-align:center; padding:20px;">ไม่พบประวัติการจ่ายสวัสดิการที่เลือก</td></tr>`;
                } else {
                    filtered.forEach(w => {
                        let name = '';
                        if (w.recipientType === 'member') {
                            const m = members.find(member => member.id === w.recipientId);
                            name = m ? `${m.name} (รุ่น ${m.generation})` : 'สมาชิกหายไป';
                        } else {
                            const t = teachers.find(teacher => teacher.id === w.recipientId);
                            name = t ? t.name : 'อาจารย์หายไป';
                        }

                        const wTypeNames = {
                            member_deceased: 'สมาชิกถึงแก่กรรม',
                            family_deceased: 'ครอบครัวถึงแก่กรรม',
                            member_medical: 'เยี่ยมไข้สมาชิก',
                            teacher_deceased: 'อาจารย์ถึงแก่กรรม',
                            teacher_medical: 'เยี่ยมไข้อาจารย์'
                        };

                        html += `
                            <tr>
                                <td>${formatCEToBEDate(w.claimDate)}</td>
                                <td><strong>${w.recipientId}</strong></td>
                                <td>${name}</td>
                                <td>${w.recipientType === 'member' ? 'สมาชิก' : 'อาจารย์'}</td>
                                <td><strong>${wTypeNames[w.welfareType] || w.welfareType}</strong></td>
                                <td><strong>${w.amount.toLocaleString()}</strong> บาท</td>
                                <td><small>${w.details}</small></td>
                            </tr>
                        `;
                    });
                }

                html += `</tbody></table>`;
                content.innerHTML = html;
            }
        }
    }

    // ==========================================================================
    // 9. แท็บควบคุมจัดการฐานข้อมูลผ่านไฟล์ Excel (Settings Operations - Excel Backup & Restore)
    // ==========================================================================
    const btnExport = document.getElementById('btn-export-db');
    const btnImport = document.getElementById('btn-import-db');
    const btnReset = document.getElementById('btn-reset-db');

    function renderSettingsTab() {
        const membersCount = db.getMembers().length;
        const teachersCount = db.getTeachers().length;
        const feesCount = db.getFees().length;
        const welfaresCount = db.getWelfares().length;

        const summaryBox = document.getElementById('db-summary-info');
        if (summaryBox) {
            summaryBox.innerHTML = `
                • <strong>จำนวนทะเบียนสมาชิก:</strong> ${membersCount} คน<br>
                • <strong>จำนวนทะเบียนอาจารย์:</strong> ${teachersCount} คน<br>
                • <strong>ประวัติการรับชำระค่าบำรุง:</strong> ${feesCount} รายการ<br>
                • <strong>ประวัติการจ่ายเงินสวัสดิการ:</strong> ${welfaresCount} รายการ
            `;
        }
    }

    btnExport.addEventListener('click', () => {
        try {
            const members  = db.getMembers();
            const teachers = db.getTeachers();
            const fees     = db.getFees();
            const welfares = db.getWelfares();
            const settings = db.getSettings();

            // ฟังก์ชันช่วยแปลงวันที่ YYYY-MM-DD (ค.ศ.) → DD/MM/YYYY+543 (พ.ศ.)
            function ceToBEDisplay(dateStr) {
                if (!dateStr) return '';
                const parts = dateStr.split('-');
                if (parts.length !== 3) return dateStr;
                return `${parts[2]}/${parts[1]}/${parseInt(parts[0], 10) + 543}`;
            }

            // ฟังก์ชันแปลง array ของ object โดยระบุชื่อ field ที่เป็นวันที่
            function convertDatesForExport(records, dateFields) {
                return records.map(r => {
                    const row = { ...r };
                    dateFields.forEach(f => {
                        if (f in row) row[f] = ceToBEDisplay(row[f]);
                    });
                    return row;
                });
            }

            // แปลงวันที่ในแต่ละ sheet
            const membersExport  = convertDatesForExport(members,  ['applyDate', 'birthDate', 'lastPaymentDate']);
            const teachersExport = convertDatesForExport(teachers,  ['applyDate', 'birthDate', 'lastPaymentDate']);
            const feesExport     = convertDatesForExport(fees,      ['paymentDate']);
            const welfaresExport = convertDatesForExport(welfares,  ['claimDate']);

            // สร้าง Workbook
            const wb = XLSX.utils.book_new();

            // แปลงข้อมูลเป็น Worksheet
            const wsMembers  = XLSX.utils.json_to_sheet(membersExport);
            const wsTeachers = XLSX.utils.json_to_sheet(teachersExport);
            const wsFees     = XLSX.utils.json_to_sheet(feesExport);
            const wsWelfares = XLSX.utils.json_to_sheet(welfaresExport);
            const wsSettings = XLSX.utils.json_to_sheet([settings]);

            // บรรจุลงใน Workbook แยกชีตตามแท็บ
            XLSX.utils.book_append_sheet(wb, wsMembers,  "members");
            XLSX.utils.book_append_sheet(wb, wsTeachers, "teachers");
            XLSX.utils.book_append_sheet(wb, wsFees,     "fees");
            XLSX.utils.book_append_sheet(wb, wsWelfares, "welfares");
            XLSX.utils.book_append_sheet(wb, wsSettings, "settings");

            // ดึงชื่อไฟล์ระบุวันที่ปัจจุบัน
            const fileDate = state.systemDate || new Date().toISOString().slice(0, 10);
            const fileName = `bncc_club_database_backup_${fileDate}.xlsx`;

            // ดาวน์โหลดไฟล์ Excel (.xlsx)
            XLSX.writeFile(wb, fileName);
            alert("ดาวน์โหลดไฟล์สำรองฐานข้อมูล Excel สำเร็จแล้ว (วันที่แสดงเป็น พ.ศ.)");
        } catch (error) {
            alert(`เกิดข้อผิดพลาดในการส่งออกไฟล์ Excel: ${error.message}`);
        }
    });


    btnImport.addEventListener('click', () => {
        const fileInput = document.getElementById('db-import-file');
        if (!fileInput || fileInput.files.length === 0) {
            alert("กรุณาเลือกไฟล์ Excel (.xlsx) ที่ต้องการนำเข้าก่อน");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // ค้นหาชีตที่ต้องการนำเข้า
                const sheetNames = workbook.SheetNames;
                if (!sheetNames.includes("members") || !sheetNames.includes("teachers") || !sheetNames.includes("fees") || !sheetNames.includes("welfares")) {
                    throw new Error("ไฟล์ Excel ไม่ตรงกับรูปแบบโครงสร้างข้อมูลระบบ (ขาดแผ่นงานชีตที่จำเป็น)");
                }

                // แปลงข้อมูลจากชีตกลับเป็น JSON
                const members = XLSX.utils.sheet_to_json(workbook.Sheets["members"]);
                const teachers = XLSX.utils.sheet_to_json(workbook.Sheets["teachers"]);
                const fees = XLSX.utils.sheet_to_json(workbook.Sheets["fees"]);
                const welfares = XLSX.utils.sheet_to_json(workbook.Sheets["welfares"]);
                
                // สำหรับแท็บสคริปต์การตั้งค่าระบบ
                let settings = { systemDate: state.systemDate };
                if (sheetNames.includes("settings")) {
                    const settingsArr = XLSX.utils.sheet_to_json(workbook.Sheets["settings"]);
                    if (settingsArr.length > 0) {
                        settings = settingsArr[0];
                    }
                }

                // ยืนยันการทับข้อมูล
                if (confirm("คำเตือน: การนำเข้าข้อมูลนี้จะเขียนทับข้อมูลทั้งหมดในระบบเบราว์เซอร์ปัจจุบัน ยืนยันดำเนินการ?")) {
                    // ทำความสะอาดชนิดข้อมูลก่อนเซฟ (เช่น แปลงปี/จำนวนเงินเป็นตัวเลขให้ถูกต้อง)
                    const cleanedMembers = members.map(m => {
                        if (m.generation) m.generation = parseInt(m.generation, 10);
                        if (m.isDeceased !== undefined) m.isDeceased = String(m.isDeceased).toLowerCase() === 'true';
                        if (m.isReappliedAfterTermination !== undefined) m.isReappliedAfterTermination = String(m.isReappliedAfterTermination).toLowerCase() === 'true';
                        return m;
                    });

                    const cleanedTeachers = teachers.map(t => {
                        return t;
                    });

                    const cleanedFees = fees.map(f => {
                        if (f.amount) f.amount = parseInt(f.amount, 10);
                        if (f.year) f.year = parseInt(f.year, 10);
                        return f;
                    });

                    const cleanedWelfares = welfares.map(w => {
                        if (w.amount) w.amount = parseInt(w.amount, 10);
                        return w;
                    });

                    // บันทึกลงฐานข้อมูล local db
                    db.saveMembers(cleanedMembers);
                    db.saveTeachers(cleanedTeachers);
                    db.saveFees(cleanedFees);
                    db.saveWelfares(cleanedWelfares);
                    db.saveSettings(settings);

                    // ซิงค์ระบบวัน
                    state.systemDate = settings.systemDate;
                    if (window.syncDateDropdownsFromState) window.syncDateDropdownsFromState();

                    alert("นำเข้าข้อมูลจาก Excel เข้าสู่ระบบเรียบร้อยแล้ว หน้าจอจะรีโหลดใหม่");
                    fileInput.value = ''; // ล้างช่องเลือกไฟล์
                    refreshCurrentView();
                    renderSettingsTab();
                }
            } catch (error) {
                alert(`ล้มเหลวในการนำเข้าข้อมูล: ${error.message}`);
            }
        };

        reader.readAsArrayBuffer(file);
    });

    btnReset.addEventListener('click', () => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะทำการ Update ฐานข้อมูล? การดำเนินการนี้จะคืนค่าฐานข้อมูลสมาชิกและข้อมูลการเงินกลับเป็นข้อมูลตั้งต้นเริ่มต้นสำหรับการทดสอบ")) {
            db.reset();
            const set = db.getSettings();
            state.systemDate = set.systemDate;
            if (window.syncDateDropdownsFromState) window.syncDateDropdownsFromState();
            alert("Update ฐานข้อมูลคืนค่าเริ่มต้นสำเร็จเรียบร้อยแล้ว");
            refreshCurrentView();
        }
    });

    // ==========================================================================
    // 10. กลไกจัดการเปิด/ปิดป๊อปอัพ และสร้างฟอร์ม (Modal Control Engine)
    // ==========================================================================
    window.openModal = function(id) {
        document.getElementById(id).classList.add('show');
    };

    window.closeModal = function(id) {
        document.getElementById(id).classList.remove('show');
    };

    // --- ดักฟอร์มสมาชิก ---
    const memberForm = document.getElementById('member-form');
    
    // ตั้งค่ารูปอัปโหลดในรูปแบบ Base64
    let selectedBase64Photo = "";
    document.getElementById('member-photo-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                selectedBase64Photo = evt.target.result;
                document.getElementById('member-photo-preview').innerHTML = `<img src="${selectedBase64Photo}" style="width:100%; height:100%; object-fit:cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // ปุ่มเปิดฟอร์มเพิ่มสมาชิกใหม่

    // ==========================================================================
    // UTILITY: Date Dropdown Helpers (สำหรับแสดงวันที่เป็น พ.ศ. ในฟอร์ม)
    // ==========================================================================
    const THAI_MONTHS_SHORT = [
        { val: '01', name: 'ม.ค.' }, { val: '02', name: 'ก.พ.' },
        { val: '03', name: 'มี.ค.' }, { val: '04', name: 'เม.ย.' },
        { val: '05', name: 'พ.ค.' }, { val: '06', name: 'มิ.ย.' },
        { val: '07', name: 'ก.ค.' }, { val: '08', name: 'ส.ค.' },
        { val: '09', name: 'ก.ย.' }, { val: '10', name: 'ต.ค.' },
        { val: '11', name: 'พ.ย.' }, { val: '12', name: 'ธ.ค.' }
    ];

    function initDateDropdowns(prefix, yearMinBE, yearMaxBE) {
        const dayEl   = document.getElementById(`${prefix}-day`);
        const monthEl = document.getElementById(`${prefix}-month`);
        const yearEl  = document.getElementById(`${prefix}-year`);
        if (!dayEl || !monthEl || !yearEl) return;

        dayEl.innerHTML = '';
        for (let d = 1; d <= 31; d++) {
            dayEl.innerHTML += `<option value="${String(d).padStart(2,'0')}">${d}</option>`;
        }
        monthEl.innerHTML = THAI_MONTHS_SHORT.map(m => `<option value="${m.val}">${m.name}</option>`).join('');
        yearEl.innerHTML = '';
        for (let y = yearMinBE; y <= yearMaxBE; y++) {
            yearEl.innerHTML += `<option value="${y}">${y}</option>`;
        }
    }

    function setDateDropdowns(prefix, ceDateStr) {
        const dayEl   = document.getElementById(`${prefix}-day`);
        const monthEl = document.getElementById(`${prefix}-month`);
        const yearEl  = document.getElementById(`${prefix}-year`);
        if (!dayEl || !monthEl || !yearEl || !ceDateStr) return;
        const parts = ceDateStr.split('-');
        if (parts.length !== 3) return;
        const yearBE = parseInt(parts[0], 10) + 543;
        dayEl.value   = parts[2];
        monthEl.value = parts[1];
        yearEl.value  = String(yearBE);
    }

    function getDateFromDropdowns(prefix) {
        const dayEl   = document.getElementById(`${prefix}-day`);
        const monthEl = document.getElementById(`${prefix}-month`);
        const yearEl  = document.getElementById(`${prefix}-year`);
        if (!dayEl || !monthEl || !yearEl) return '';
        const yearCE = parseInt(yearEl.value, 10) - 543;
        return `${yearCE}-${monthEl.value}-${dayEl.value}`;
    }

    function formatCEToBEDate(dateStr) {
        if (!dateStr) return '-';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const yearCE = parseInt(parts[0], 10);
            const month = parts[1];
            const day = parts[2];
            const yearBE = yearCE + 543;
            return `${day}/${month}/${yearBE}`;
        }
        return dateStr;
    }


    function getNextMemberId(generation) {
        const members = db.getMembers();
        const genStr = String(generation).padStart(2, '0');
        let maxSeq = 0;
        members.forEach(m => {
            if (parseInt(m.generation, 10) === parseInt(generation, 10)) {
                const match = m.id.match(/\d+$/);
                if (match) {
                    const numStr = match[0];
                    let seqPart = numStr;
                    if (numStr.startsWith(genStr) && numStr.length > genStr.length) {
                        seqPart = numStr.substring(genStr.length);
                    } else if (numStr.startsWith(String(generation)) && numStr.length > String(generation).length) {
                        seqPart = numStr.substring(String(generation).length);
                    }
                    const seq = parseInt(seqPart, 10);
                    if (!isNaN(seq) && seq > maxSeq) {
                        maxSeq = seq;
                    }
                }
            }
        });
        const nextSeq = maxSeq + 1;
        return `${genStr}${String(nextSeq).padStart(3, '0')}`;
    }

    // ควบคุมการเปลี่ยนรุ่นของฟอร์มสมาชิกและคำนวณรหัสสมาชิกอัตโนมัติ
    setTimeout(() => {
        const memberInputGen = document.getElementById('member-input-gen');
        const memberInputId = document.getElementById('member-input-id');
        if (memberInputGen && memberInputId) {
            const updateHandler = () => {
                const genVal = parseInt(memberInputGen.value, 10);
                const mode = document.getElementById('member-form-mode').value;
                if (!isNaN(genVal)) {
                    if (mode === 'add') {
                        memberInputId.value = getNextMemberId(genVal);
                    } else if (mode === 'edit' && state.currentEditingMember) {
                        if (genVal === parseInt(state.currentEditingMember.generation, 10)) {
                            memberInputId.value = state.currentEditingMember.id;
                        } else {
                            memberInputId.value = getNextMemberId(genVal);
                        }
                    }
                }
            };
            memberInputGen.addEventListener('input', updateHandler);
            memberInputGen.addEventListener('change', updateHandler);
        }
    }, 100);


    document.getElementById('btn-add-member').addEventListener('click', () => {
        memberForm.reset();
        selectedBase64Photo = "";
        document.getElementById('member-photo-preview').innerHTML = `<i class="fa-solid fa-user"></i>`;
        document.getElementById('member-modal-title').innerText = "ลงทะเบียนสมัครสมาชิกใหม่";
        document.getElementById('member-form-mode').value = "add";
        document.getElementById('member-input-id').disabled = true; // ล็อกไม่ให้กรอกเอง
        state.currentEditingMember = null;
        
        // กำหนดวันที่เริ่มต้น
        setDateDropdowns('member-apply', state.systemDate);
        setDateDropdowns('member-birth', state.systemDate);
        setDateDropdowns('member-last-pay', state.systemDate);
        
        // รันไอดีถัดไปของรุ่น
        const defaultGen = 75;
        document.getElementById('member-input-gen').value = defaultGen;
        document.getElementById('member-input-id').value = getNextMemberId(defaultGen);

        openModal('modal-member-form');
    });

    // ฟังก์ชันเปิดแก้ไขข้อมูลสมาชิก
    window.openMemberEditModal = function(id) {
        const members = db.getMembers();
        const m = members.find(item => item.id === id);
        if (!m) return;
        
        state.currentEditingMember = m; // บันทึกผู้ใช้ที่กำลังแก้ไข
        memberForm.reset();
        selectedBase64Photo = m.photo || "";
        
        if (selectedBase64Photo) {
            document.getElementById('member-photo-preview').innerHTML = `<img src="${selectedBase64Photo}" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            document.getElementById('member-photo-preview').innerHTML = `<i class="fa-solid fa-user"></i>`;
        }

        document.getElementById('member-modal-title').innerText = `แก้ไขข้อมูลสมาชิกประจำตระกูล (${m.id})`;
        document.getElementById('member-form-mode').value = "edit";
        document.getElementById('member-form-id-hidden').value = m.id;
        document.getElementById('member-input-id').value = m.id;
        document.getElementById('member-input-id').disabled = true; // แก้รหัส ID ไม่ได้

        document.getElementById('member-input-gen').value = m.generation;
        document.getElementById('member-input-name').value = m.name;
        document.getElementById('member-input-nickname').value = m.nickname;
        setDateDropdowns('member-apply', m.applyDate);
        setDateDropdowns('member-birth', m.birthDate);
        document.getElementById('member-input-phone').value = m.phone;
        document.getElementById('member-input-line').value = m.lineId || '';
        document.getElementById('member-input-facebook').value = m.facebook || '';
        document.getElementById('member-input-occupation').value = m.occupation || '';
        document.getElementById('member-input-address').value = m.address || '';
        document.getElementById('member-input-edu-faculty').value = m.education ? `${m.education.faculty || ''}` : '';
        setDateDropdowns('member-last-pay', m.lastPaymentDate || state.systemDate);
        
        document.getElementById('member-input-emergency-name').value = m.emergencyContact ? m.emergencyContact.name : '';
        document.getElementById('member-input-emergency-rel').value = m.emergencyContact ? m.emergencyContact.relationship : '';
        document.getElementById('member-input-emergency-phone').value = m.emergencyContact ? m.emergencyContact.phone : '';
        
        document.getElementById('member-input-reapplied').checked = m.isReappliedAfterTermination || false;

        openModal('modal-member-form');
    };

    memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const mode = document.getElementById('member-form-mode').value;
        const id = document.getElementById('member-input-id').value.trim();
        const gen = parseInt(document.getElementById('member-input-gen').value);
        const name = document.getElementById('member-input-name').value.trim();
        const nickname = document.getElementById('member-input-nickname').value.trim();
        const applyDate   = getDateFromDropdowns('member-apply');
        const birthDate   = getDateFromDropdowns('member-birth');
        const phone = document.getElementById('member-input-phone').value.trim();
        const line = document.getElementById('member-input-line').value.trim();
        const facebook = document.getElementById('member-input-facebook').value.trim();
        const occupation = document.getElementById('member-input-occupation').value.trim();
        const address = document.getElementById('member-input-address').value.trim();
        const eduFaculty = document.getElementById('member-input-edu-faculty').value.trim();
        const lastPayment = getDateFromDropdowns('member-last-pay');
        const reapplied = document.getElementById('member-input-reapplied').checked;

        const emName = document.getElementById('member-input-emergency-name').value.trim();
        const emRel = document.getElementById('member-input-emergency-rel').value.trim();
        const emPhone = document.getElementById('member-input-emergency-phone').value.trim();

        // 1. ตรวจสอบว่า ID สมาชิกซ้ำหรือไม่ในโหมดเพิ่มใหม่
        if (mode === 'add') {
            const members = db.getMembers();
            if (members.some(m => m.id === id)) {
                alert(`รหัสสมาชิก ${id} มีการลงทะเบียนในฐานข้อมูลแล้ว กรุณาใช้รหัสใหม่`);
                return;
            }
        }

        const memberData = {
            id: id,
            generation: gen,
            name: name,
            nickname: nickname,
            applyDate: applyDate,
            birthDate: birthDate,
            phone: phone,
            lineId: line,
            facebook: facebook,
            address: address,
            education: { gen: gen, faculty: eduFaculty, major: '' },
            emergencyContact: { name: emName, relationship: emRel, phone: emPhone },
            occupation: occupation,
            photo: selectedBase64Photo,
            isReappliedAfterTermination: reapplied,
            lastPaymentDate: lastPayment,
            status: 'active' // ถูก override โดย engine เมื่อคำนวณอยู่แล้ว
        };

        if (mode === 'add') {
            // เพิ่มประวัติชำระเงินตั้งต้นให้ด้วยในการเก็บข้อมูล
            db.addMember(memberData);
            
            const newFee = {
                id: `F${String(db.getFees().length + 1).padStart(3, '0')}`,
                memberId: id,
                paymentDate: lastPayment,
                amount: 300,
                year: new Date(lastPayment).getFullYear(),
                recordedBy: "ผู้ดูแลทะเบียนสมาชิก"
            };
            db.addFee(newFee);

            alert("ลงทะเบียนสมาชิกคนใหม่พร้อมตั้งยอดชำระสำเร็จแล้ว");
        } else {
            // โหมดแก้ไข
            const hiddenId = document.getElementById('member-form-id-hidden').value;
            memberData.id = hiddenId; // ล็อกไอดีเดิม
            db.updateMember(memberData);
            alert("ปรับปรุงรายละเอียดข้อมูลทะเบียนสมาชิกแล้ว");
        }

        closeModal('modal-member-form');
        refreshCurrentView();
    });

    // --- ดูข้อมูลสมาชิกแบบละเอียด (Detail view) ---
    window.viewMemberDetail = function(id) {
        const members = db.getMembers();
        const m = members.find(item => item.id === id);
        if (!m) return;

        const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);

        // สีประจำตัวตามสิทธิ์สถานะสมาชิก
        let badgeClass = 'badge-active';
        switch (statusInfo.statusKey) {
            case 'active': badgeClass = 'badge-active'; break;
            case 'active_new': badgeClass = 'badge-active-new'; break;
            case 'grace_period': badgeClass = 'badge-grace'; break;
            case 'suspended': badgeClass = 'badge-suspended'; break;
            case 'terminated': badgeClass = 'badge-terminated'; break;
            case 'deceased': badgeClass = 'badge-deceased'; break;
        }

        // หน้าตาข้อมูลรูป
        const photoContainer = document.getElementById('detail-photo-container');
        if (m.photo) {
            photoContainer.innerHTML = `<img src="${m.photo}" class="profile-photo" alt="profile">`;
        } else {
            photoContainer.innerHTML = `<div class="profile-photo-placeholder">${m.nickname ? m.nickname.charAt(0) : m.name.charAt(3)}</div>`;
        }

        document.getElementById('detail-display-name').innerText = m.name;
        document.getElementById('detail-display-id').innerText = `รหัสสมาชิก: ${m.id}`;
        document.getElementById('detail-display-status-badge').innerHTML = `<span class="badge ${badgeClass}">${statusInfo.statusText}</span>`;

        document.getElementById('detail-val-nickname').innerText = m.nickname || '-';
        
        // คำนวณอายุ
        let ageStr = '-';
        if (m.birthDate) {
            const birthY = new Date(m.birthDate).getFullYear();
            const sysY = new Date(state.systemDate).getFullYear();
            ageStr = `${sysY - birthY} ปี (${formatCEToBEDate(m.birthDate)})`;
        }
        document.getElementById('detail-val-birth').innerText = ageStr;
        document.getElementById('detail-val-phone').innerText = m.phone || '-';
        document.getElementById('detail-val-gen').innerText = `รุ่น พ.น. ${m.generation}`;
        document.getElementById('detail-val-line').innerText = m.lineId || '-';
        document.getElementById('detail-val-facebook').innerText = m.facebook || '-';
        document.getElementById('detail-val-address').innerText = m.address || '-';
        document.getElementById('detail-val-education').innerText = m.education ? `${m.education.faculty || '-'}` : '-';
        document.getElementById('detail-val-occupation').innerText = m.occupation || '-';

        document.getElementById('detail-val-apply-date').innerText = formatCEToBEDate(m.applyDate);
        document.getElementById('detail-val-last-payment').innerText = m.lastPaymentDate ? formatCEToBEDate(m.lastPaymentDate) : 'ไม่มีข้อมูล';
        document.getElementById('detail-val-renewal-date').innerText = statusInfo.renewalDueDate ? formatCEToBEDate(statusInfo.renewalDueDate) : 'ไม่ครบกำหนด';
        
        // วันเกินกำหนดชำระ
        if (statusInfo.overdueDays > 0) {
            document.getElementById('detail-val-overdue-days').innerHTML = `<span style="color:var(--status-suspended); font-weight:600;">เกินกำหนดชำระมาแล้ว ${statusInfo.overdueDays} วัน</span>`;
        } else {
            document.getElementById('detail-val-overdue-days').innerHTML = `<span style="color:var(--status-active);">เหลือระยะเวลาอีก ${statusInfo.daysRemaining} วัน</span>`;
        }

        document.getElementById('detail-val-eligibility-reason').innerText = statusInfo.reason;

        // ข้อมูลผู้ติดต่อฉุกเฉิน
        document.getElementById('detail-val-emergency-name').innerText = m.emergencyContact ? m.emergencyContact.name : '-';
        document.getElementById('detail-val-emergency-rel').innerText = m.emergencyContact ? m.emergencyContact.relationship : '-';
        document.getElementById('detail-val-emergency-phone').innerText = m.emergencyContact ? m.emergencyContact.phone : '-';

        // ปิดหรือเปิดปุ่มทำรายการในชีตละเอียดตามบทบาทผู้ใช้
        const payBtn = document.getElementById('btn-detail-pay-fee');
        const editBtn = document.getElementById('btn-detail-edit-info');
        
        if (state.currentRole === 'member_admin' && m.status !== 'deceased') {
            payBtn.style.display = 'block';
            editBtn.style.display = 'block';
            
            // ลิงก์ฟังก์ชัน
            payBtn.onclick = () => {
                closeModal('modal-member-detail');
                openPaymentConfirmModal(m.id);
            };
            editBtn.onclick = () => {
                closeModal('modal-member-detail');
                openMemberEditModal(m.id);
            };
        } else {
            payBtn.style.display = 'none';
            editBtn.style.display = 'none';
        }

        openModal('modal-member-detail');
    };

    // --- ดักการชำระเงินค่าบำรุงสมาชิกประจำปี (Fee Form Submit) ---
    const paymentForm = document.getElementById('payment-confirm-form');
    
    window.openPaymentConfirmModal = function(memberId) {
        const members = db.getMembers();
        const m = members.find(item => item.id === memberId);
        if (!m) return;

        const statusInfo = MembershipEngine.calculateMemberStatus(m, state.systemDate);

        document.getElementById('payment-form-member-id').value = m.id;
        document.getElementById('payment-confirm-member-name').innerText = m.name;
        document.getElementById('payment-confirm-member-id-display').innerText = `รหัสสมาชิก: ${m.id} | รุ่น พ.น. ${m.generation}`;
        document.getElementById('payment-confirm-current-renewal').innerText = `รอบต่ออายุเดิม: ${statusInfo.renewalDueDate ? formatCEToBEDate(statusInfo.renewalDueDate) : 'ยังไม่มีรอบชำระเงิน'}`;

        // ตั้งวันจ่ายเป็นวันที่จำลองในวันนี้
        setDateDropdowns('payment', state.systemDate);
        
        // ตั้งงวดปีตามปีของวันที่จำลองชำระเงิน
        document.getElementById('payment-input-year').value = new Date(state.systemDate).getFullYear() + 543;

        openModal('modal-confirm-payment');
    };

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const memberId = document.getElementById('payment-form-member-id').value;
        const date = getDateFromDropdowns('payment');
        const yearBE = parseInt(document.getElementById('payment-input-year').value);
        const yearCE = yearBE - 543;
        const amount = 300;

        const newFee = {
            id: `F${String(db.getFees().length + 1).padStart(3, '0')}`,
            memberId: memberId,
            paymentDate: date,
            amount: amount,
            year: yearCE,
            recordedBy: "ผู้ดูแลทะเบียนสมาชิก"
        };

        db.addFee(newFee);
        
        alert(`บันทึกรับเงินค่าบำรุงของสมาชิกรหัส ${memberId} ประจำงวดปี ${yearBE} เรียบร้อยแล้ว`);
        closeModal('modal-confirm-payment');
        refreshCurrentView();
    });

    // --- ดักฟอร์มลงทะเบียนอาจารย์ (Teacher Form Submit) ---
    const teacherForm = document.getElementById('teacher-form');

    // ปุ่มเปิดฟอร์มเพิ่มอาจารย์ใหม่
    document.getElementById('btn-add-teacher').addEventListener('click', () => {
        teacherForm.reset();
        document.getElementById('teacher-modal-title').innerText = "ลงทะเบียนประวัติอาจารย์ใหม่";
        document.getElementById('teacher-form-mode').value = "add";
        document.getElementById('teacher-input-id').disabled = false;
        
        // รันไอดีถัดไปของอาจารย์
        const teachers = db.getTeachers();
        const nextIdNum = Math.max(...teachers.map(t => parseInt(t.id.replace(/\D/g, '')) || 0), 0) + 1;
        document.getElementById('teacher-input-id').value = `A${String(nextIdNum).padStart(4, '0')}`;

        openModal('modal-teacher-form');
    });

    // เปิดแก้ไขอาจารย์
    window.openTeacherEditModal = function(id) {
        const teachers = db.getTeachers();
        const t = teachers.find(item => item.id === id);
        if (!t) return;

        teacherForm.reset();
        document.getElementById('teacher-modal-title').innerText = `แก้ไขข้อมูลประวัติอาจารย์ (${t.id})`;
        document.getElementById('teacher-form-mode').value = "edit";
        document.getElementById('teacher-form-id-hidden').value = t.id;
        document.getElementById('teacher-input-id').value = t.id;
        document.getElementById('teacher-input-id').disabled = true;

        document.getElementById('teacher-input-name').value = t.name;
        document.getElementById('teacher-input-phone').value = t.phone || '';
        document.getElementById('teacher-input-status').value = t.status;
        document.getElementById('teacher-input-address').value = t.address || '';
        document.getElementById('teacher-input-notes').value = t.notes || '';

        openModal('modal-teacher-form');
    };

    teacherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const mode = document.getElementById('teacher-form-mode').value;
        const id = document.getElementById('teacher-input-id').value.trim();
        const name = document.getElementById('teacher-input-name').value.trim();
        const phone = document.getElementById('teacher-input-phone').value.trim();
        const status = document.getElementById('teacher-input-status').value;
        const address = document.getElementById('teacher-input-address').value.trim();
        const notes = document.getElementById('teacher-input-notes').value.trim();

        if (mode === 'add') {
            const teachers = db.getTeachers();
            if (teachers.some(t => t.id === id)) {
                alert(`รหัสอาจารย์ ${id} มีการลงทะเบียนในระบบแล้ว`);
                return;
            }
        }

        const teacherData = {
            id: id,
            name: name,
            phone: phone,
            status: status,
            address: address,
            notes: notes
        };

        if (mode === 'add') {
            db.addTeacher(teacherData);
            alert("ลงทะเบียนบันทึกอาจารย์ท่านใหม่สำเร็จแล้ว");
        } else {
            const hiddenId = document.getElementById('teacher-form-id-hidden').value;
            teacherData.id = hiddenId;
            db.updateTeacher(teacherData);
            alert("ปรับปรุงรายละเอียดข้อมูลทะเบียนอาจารย์แล้ว");
        }

        closeModal('modal-teacher-form');
        refreshCurrentView();
    });

    // ซ่อนผลลัพธ์การเสิร์ชของสวัสดิการเมื่อคลิกข้างนอก
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#welfare-search-recipient') && !e.target.closest('#welfare-search-results')) {
            welfareSearchResults.style.display = 'none';
        }
    });

    // ==========================================================================
    // 0. ระบบการเข้าสู่ระบบหลังบ้าน (Login / Logout Control)
    // ==========================================================================
    function initLogin() {
        const rememberedUser = localStorage.getItem('bncc_remembered_username');
        const rememberedPass = localStorage.getItem('bncc_remembered_password');
        if (rememberedUser && rememberedPass) {
            const userEl = document.getElementById('login-username');
            const passEl = document.getElementById('login-password');
            if (userEl) userEl.value = rememberedUser;
            if (passEl) passEl.value = rememberedPass;
            const rememberCheck = document.getElementById('login-remember');
            if (rememberCheck) rememberCheck.checked = true;
        }

        DOM.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value.trim();

            let role = '';
            let userName = '';
            let roleText = '';

            // ตรวจสอบข้อมูลบัญชี
            const cleanUser = username.toLowerCase();
            const cleanPass = password;

            const users = db.getUsers();
            let matchedUser = users.find(u => 
                u.username.toLowerCase() === cleanUser && u.password === cleanPass
            );

            if (!matchedUser) {
                alert('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
                return;
            }

            role = matchedUser.role;
            userName = matchedUser.name;
            roleText = role === 'member_admin' ? 'ผู้ดูแลทะเบียนสมาชิก' :
                       role === 'welfare_admin' ? 'ผู้ดูแลสวัสดิการ' :
                       role === 'executive' ? 'ผู้บริหาร/กรรมการชมรม' :
                       role === 'super_admin' ? 'ผู้ดูแลระบบ (Super Admin)' : 'ไม่ทราบสิทธิ์';


            // บันทึกสถานะ Login
            state.isLoggedIn = true;
            
            const rememberCheck = document.getElementById('login-remember');
            if (rememberCheck && rememberCheck.checked) {
                localStorage.setItem('bncc_remembered_username', username);
                localStorage.setItem('bncc_remembered_password', password);
            } else {
                localStorage.removeItem('bncc_remembered_username');
                localStorage.removeItem('bncc_remembered_password');
            }
            state.currentRole = role;
            sessionStorage.setItem('bncc_logged_in', 'true');
            sessionStorage.setItem('bncc_user_role', role);

            // อัปเดตข้อมูลผู้ใช้ใน UI
            DOM.sidebarRole.innerText = roleText;
            DOM.sidebarUser.innerText = userName;

            // ซ่อนหน้าล็อกอินและแสดงหน้าจอหลัก
            DOM.loginScreen.style.opacity = '0';
            setTimeout(() => {
                DOM.loginScreen.style.display = 'none';
                DOM.appContainer.style.display = 'flex';
                applyRolePermissions();
                navigateTo('dashboard');
                // ทริกเกอร์อัปเดตบทบาทในระบบเพื่อให้ UI อัปเดตเต็มรูปแบบ
                DOM.roleSelect.dispatchEvent(new Event('change'));
            }, 300);
        });

        // ปุ่มออกจากระบบ
        DOM.btnLogout.addEventListener('click', () => {
            if (confirm('คุณต้องการออกจากระบบหลังบ้านใช่หรือไม่?')) {
                state.isLoggedIn = false;
                sessionStorage.removeItem('bncc_logged_in');
                sessionStorage.removeItem('bncc_user_role');
                
                DOM.appContainer.style.display = 'none';
                DOM.loginScreen.style.display = 'flex';
                DOM.loginScreen.style.opacity = '1';
                DOM.loginForm.reset();
            }
        });
    }

    function initDashboardCardClicks() {
        const totalCard = document.getElementById('card-total-members');
        const activeCard = document.getElementById('card-active-members');
        const graceCard = document.getElementById('card-grace-members');
        const suspendedCard = document.getElementById('card-suspended-members');
        const teacherCard = document.getElementById('card-total-teachers');
        const welfareCard = document.getElementById('card-total-welfare');

        function resetMemberFilters() {
            const genFilter = document.getElementById('member-filter-gen');
            if (genFilter) genFilter.value = 'all';
            const searchInput = document.getElementById('member-search-input');
            if (searchInput) searchInput.value = '';
        }

        if (totalCard) {
            totalCard.addEventListener('click', () => {
                resetMemberFilters();
                const statusFilter = document.getElementById('member-filter-status');
                if (statusFilter) statusFilter.value = 'all';
                navigateTo('members');
            });
        }

        if (activeCard) {
            activeCard.addEventListener('click', () => {
                resetMemberFilters();
                const statusFilter = document.getElementById('member-filter-status');
                if (statusFilter) statusFilter.value = 'active';
                navigateTo('members');
            });
        }

        if (graceCard) {
            graceCard.addEventListener('click', () => {
                navigateTo('fees');
            });
        }

        if (suspendedCard) {
            suspendedCard.addEventListener('click', () => {
                resetMemberFilters();
                const statusFilter = document.getElementById('member-filter-status');
                if (statusFilter) statusFilter.value = 'suspended';
                navigateTo('members');
            });
        }

        if (teacherCard) {
            teacherCard.addEventListener('click', () => {
                // สำหรับทะเบียนอาจารย์ เมื่อคลิกแล้วจะเปิดไปที่หน้า "ทะเบียนอาจารย์" (teachers)
                // พร้อมรีเซ็ตตัวกรองเป็น "ทุกสถานะ"
                const teacherFilter = document.getElementById('teacher-filter-status');
                if (teacherFilter) teacherFilter.value = 'all';
                const teacherSearch = document.getElementById('teacher-search-input');
                if (teacherSearch) teacherSearch.value = '';
                navigateTo('teachers');
            });
        }

        if (welfareCard) {
            welfareCard.addEventListener('click', () => {
                navigateTo('welfare');
            });
        }
    }

    function initThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (!themeBtn) return;

        function applyTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> โหมดมืด';
                themeBtn.title = 'สลับเป็นโหมดมืด';
            } else {
                document.body.classList.remove('light-theme');
                themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> โหมดสว่าง';
                themeBtn.title = 'สลับเป็นโหมดสว่าง';
            }
            if (state.currentView === 'dashboard') {
                updateDashboardStats();
            }
        }

        const savedTheme = localStorage.getItem('bncc_theme') || 'dark';
        applyTheme(savedTheme);

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-theme');
            const newTheme = isLight ? 'dark' : 'light';
            localStorage.setItem('bncc_theme', newTheme);
            applyTheme(newTheme);
        });
    }

    window.exportReportToExcel = function() {
        const reportTitleElement = document.getElementById('report-print-title');
        const reportTitle = reportTitleElement ? reportTitleElement.innerText.trim() : 'รายงาน';
        const previewContent = document.getElementById('report-preview-content');

        if (!previewContent) {
            alert('ไม่พบตารางรายงานสำหรับการส่งออก');
            return;
        }

        const tables = previewContent.getElementsByTagName('table');
        if (tables.length === 0) {
            alert('ไม่พบตารางรายงานสำหรับการส่งออก');
            return;
        }

        try {
            const table = tables[0];

            // ดึงข้อมูลจากตาราง HTML → array of arrays
            const data = [];
            for (let r = 0; r < table.rows.length; r++) {
                const row = table.rows[r];
                const rowData = [];
                for (let c = 0; c < row.cells.length; c++) {
                    let text = row.cells[c].innerText.trim().replace(/[\n\r]+/g, ' ');
                    rowData.push(text);
                }
                data.push(rowData);
            }

            // สร้าง Worksheet จาก array of arrays
            const ws = XLSX.utils.aoa_to_sheet(data);

            // ปรับความกว้างคอลัมน์อัตโนมัติ
            const colWidths = data[0] ? data[0].map((_, colIdx) => ({
                wch: Math.min(40, Math.max(10, ...data.map(row => (row[colIdx] || '').length)))
            })) : [];
            ws['!cols'] = colWidths;

            // สร้าง Workbook และดาวน์โหลด
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'รายงาน');

            const fileDate = state.systemDate || new Date().toISOString().slice(0, 10);
            const [yearCE, month, day] = fileDate.split('-');
            const fileDateBE = `${day}-${month}-${parseInt(yearCE) + 543}`;
            const fileName = `${reportTitle}_${fileDateBE}.xlsx`;

            XLSX.writeFile(wb, fileName);
        } catch (error) {
            alert(`เกิดข้อผิดพลาดในการส่งออก Excel: ${error.message}`);
        }
    };


    // ==========================================================================
    // 10.5 ระบบจัดการผู้ใช้งาน (User Management)
    // ==========================================================================
    function renderUsersTable() {
        const usersTableBody = document.getElementById('users-table-body');
        if (!usersTableBody) return;
        
        let users = db.getUsers();
        
        // กรองตามสิทธิ์
        if (state.currentRole !== 'super_admin' && state.currentRole !== 'executive') {
            users = users.filter(u => u.username === state.currentUser);
        }
        
        usersTableBody.innerHTML = '';
        
        users.forEach(u => {
            const roleText = u.role === 'member_admin' ? 'ผู้ดูแลทะเบียนสมาชิก' :
                             u.role === 'welfare_admin' ? 'ผู้ดูแลสวัสดิการ' :
                             u.role === 'executive' ? 'ผู้บริหาร/กรรมการชมรม' :
                             u.role === 'super_admin' ? 'ผู้ดูแลระบบ (Super Admin)' : 'ไม่ระบุ';
                             
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.name}</td>
                <td>${u.username}</td>
                <td><span class="status-badge active">${roleText}</span></td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="icon-btn edit" onclick="window.editUser('${u.id}')" title="แก้ไขผู้ใช้"><i class="fa-solid fa-pen"></i></button>
                        ${u.username !== 'admin' && (state.currentRole === 'super_admin' || state.currentRole === 'executive') ? `<button class="icon-btn delete" onclick="window.deleteUser('${u.id}')" title="ลบผู้ใช้"><i class="fa-solid fa-trash"></i></button>` : ''}
                    </div>
                </td>
            `;
            usersTableBody.appendChild(tr);
        });
    }

    window.openUserModal = function() {
        document.getElementById('user-modal-title').innerText = 'เพิ่มผู้ใช้งานใหม่';
        document.getElementById('form-user').reset();
        document.getElementById('user-id').value = '';
        document.getElementById('user-role').disabled = false;
        window.openModal('modal-user-form');
    };

    window.editUser = function(id) {
        const users = db.getUsers();
        const user = users.find(u => u.id === id);
        if (user) {
            document.getElementById('user-modal-title').innerText = 'แก้ไขผู้ใช้งาน';
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-username').value = user.username;
            document.getElementById('user-password').value = ''; // ว่างไว้เพื่อไม่ต้องเปลี่ยนรหัส
            document.getElementById('user-role').value = user.role;
            document.getElementById('user-role').disabled = (state.currentRole !== 'super_admin' && state.currentRole !== 'executive');
            window.openModal('modal-user-form');
        }
    };

    window.deleteUser = function(id) {
        if (confirm('คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?')) {
            db.deleteUser(id);
            renderUsersTable();
            alert('ลบผู้ใช้งานเรียบร้อยแล้ว');
        }
    };

    const formUser = document.getElementById('form-user');
    if (formUser) {
        formUser.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('user-id').value;
            const name = document.getElementById('user-name').value.trim();
            const username = document.getElementById('user-username').value.trim();
            const password = document.getElementById('user-password').value.trim();
            const role = document.getElementById('user-role').value;
            
            if (id) {
                const users = db.getUsers();
                const existing = users.find(u => u.id === id);
                if (existing) {
                    existing.name = name;
                    existing.username = username;
                    if (password) existing.password = password;
                    existing.role = role;
                    db.updateUser(existing);
                    alert('แก้ไขข้อมูลเรียบร้อยแล้ว');
                }
            } else {
                if (!password) {
                    alert('กรุณากรอกรหัสผ่านสำหรับผู้ใช้ใหม่');
                    return;
                }
                const newUser = {
                    id: 'U' + Date.now(),
                    name: name,
                    username: username,
                    password: password,
                    role: role
                };
                db.addUser(newUser);
                alert('เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว');
            }
            document.getElementById('modal-user-form').style.display = 'none';
            renderUsersTable();
        });
    }

    // ==========================================================================
    // 11. เริ่มต้นระบบการทำงานทั้งหมด (App Start)
    // ==========================================================================
    initLogin();
    initNavigation();
    initRoleAndDateControls();
    initDashboardCardClicks();
    initThemeToggle();
    renderUsersTable();

    // เริ่มต้น Date Dropdowns ทุกฟอร์ม (พ.ศ.)
    initDateDropdowns('member-apply',    2500, 2580);
    initDateDropdowns('member-birth',    2430, 2580);
    initDateDropdowns('member-last-pay', 2550, 2580);
    initDateDropdowns('welfare-claim',   2550, 2580);
    initDateDropdowns('payment',         2550, 2580);

    // ตั้งค่าวันเริ่มต้นทุกฟอร์มเป็นวันที่จำลองปัจจุบัน
    setDateDropdowns('member-apply',    state.systemDate);
    setDateDropdowns('member-birth',    state.systemDate);
    setDateDropdowns('member-last-pay', state.systemDate);
    setDateDropdowns('welfare-claim',   state.systemDate);
    setDateDropdowns('payment',         state.systemDate);


    // อัปเดตเริ่มต้นกรณีเข้าใช้งานค้างเซสชันไว้
    if (state.isLoggedIn) {
        applyRolePermissions();
    }
});
