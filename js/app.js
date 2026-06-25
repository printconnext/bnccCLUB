// js/app.js
// ตัวควบคุมหน้าจอหลักและการทำงานแบบ Single Page Application (SPA)

document.addEventListener('DOMContentLoaded', () => {
    // กำหนดสถานะปัจจุบันของแอปพลิเคชัน (App State)
    const state = {
        isLoggedIn: false,
        currentView: 'dashboard',
        currentRole: 'member_admin', // member_admin, welfare_admin, executive
        systemDate: '2026-06-22',     // วันที่จำลองระบบ
        selectedWelfareRecipient: null, // เก็บข้อมูลผู้มีสิทธิ์ที่เลือกตอนทำเรื่องสวัสดิการ { id, type, name, status }
        currentReportTab: 'member_registry'
    };

    // โหลดการตั้งค่าตั้งต้นจากฐานข้อมูล
    const settings = db.getSettings();
    state.systemDate = settings.systemDate;
    document.getElementById('system-date-input').value = state.systemDate;

    // ลิงก์ส่วนประกอบหลักใน DOM
    const DOM = {
        menuItems: document.querySelectorAll('.sidebar-menu .menu-item'),
        pageViews: document.querySelectorAll('.page-view'),
        roleSelect: document.getElementById('user-role-select'),
        dateInput: document.getElementById('system-date-input'),
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
            DOM.roleSelect.value = savedRole;
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
        // จัดการเมื่อเปลี่ยนสิทธิ์บทบาทผู้ใช้
        DOM.roleSelect.addEventListener('change', (e) => {
            state.currentRole = e.target.value;
            
            // อัปเดตข้อความแสดงผู้ใช้งานใน Sidebar
            const rolesInfo = {
                member_admin: { name: 'คุณนารี ทะเบียนดี', title: 'ผู้ดูแลทะเบียนสมาชิก' },
                welfare_admin: { name: 'นายสวัสดิ์ เกื้อกูล', title: 'ผู้ดูแลสวัสดิการ' },
                executive: { name: 'พล.ต.ต. สุชน ผู้นำพา', title: 'ผู้บริหาร/กรรมการชมรม' }
            };
            
            const info = rolesInfo[state.currentRole];
            DOM.sidebarRole.innerText = info.title;
            DOM.sidebarUser.innerText = info.name;

            // จัดการเปิด/ปิดองค์ประกอบและปุ่มทำรายการใน UI
            applyRolePermissions();
            refreshCurrentView();
        });

        // จัดการเมื่อสลับเปลี่ยนวันเวลาจำลองในระบบ
        DOM.dateInput.addEventListener('change', (e) => {
            const newDate = e.target.value;
            if (newDate) {
                state.systemDate = newDate;
                // บันทึกวันที่จำลองลงฐานข้อมูลการตั้งค่า
                const settings = db.getSettings();
                settings.systemDate = newDate;
                db.saveSettings(settings);
            }
        });

        // ดักฟังการอัปเดต DB เพื่อสั่งวาดข้อมูลใหม่เสมอ
        window.addEventListener('db_updated', () => {
            refreshCurrentView();
            updateDashboardStats();
        });

        applyRolePermissions();
    }

    function applyRolePermissions() {
        const role = state.currentRole;
        
        // 1. ปุ่มสำหรับการเพิ่มสมาชิก/อาจารย์ (เฉพาะ member_admin)
        const btnAddMember = document.getElementById('btn-add-member');
        const btnAddTeacher = document.getElementById('btn-add-teacher');
        
        if (role === 'member_admin') {
            btnAddMember.style.display = 'inline-flex';
            btnAddTeacher.style.display = 'inline-flex';
        } else {
            btnAddMember.style.display = 'none';
            btnAddTeacher.style.display = 'none';
        }

        // 2. การควบคุมสิทธิ์เบิกสวัสดิการ (เฉพาะ welfare_admin เท่านั้นที่กดบันทึกได้)
        const welfareClaimPanel = document.getElementById('welfare-claim-form-panel');
        if (role === 'welfare_admin') {
            welfareClaimPanel.style.display = 'block';
        } else {
            // ซ่อนหรือปิดฟังก์ชันบันทึกเคลมสวัสดิการถ้าไม่ใช่ผู้ดูแลสวัสดิการ
            welfareClaimPanel.style.display = 'none';
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

            // นับจำนวนผู้ค้างชำระ (สถานะเป็น Grace Period หรือ Suspended)
            if (statusInfo.overdueDays > 0 && statusInfo.statusKey !== 'terminated' && statusInfo.statusKey !== 'deceased') {
                unpaidCount++;
            }
        });

        // อัปเดตตัวเลขหน้าแดชบอร์ด
        document.getElementById('stat-total-members').innerText = totalMembers;
        document.getElementById('stat-active-members').innerText = activeCount + activeNewCount;
        document.getElementById('stat-grace-members').innerText = unpaidCount;
        document.getElementById('stat-suspended-members').innerText = suspendedCount + terminatedCount;
        
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
        innerCircle.setAttribute("fill", "#131a26");
        pieSvg.appendChild(innerCircle);

        // ข้อความสรุปตรงกลาง
        const textCount = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textCount.setAttribute("x", "125");
        textCount.setAttribute("y", "120");
        textCount.setAttribute("text-anchor", "middle");
        textCount.setAttribute("fill", "#f0f3f8");
        textCount.setAttribute("font-size", "22");
        textCount.setAttribute("font-weight", "bold");
        textCount.setAttribute("transform", "rotate(90, 125, 125)");
        textCount.innerText = total;
        pieSvg.appendChild(textCount);

        const textLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textLabel.setAttribute("x", "125");
        textLabel.setAttribute("y", "142");
        textLabel.setAttribute("text-anchor", "middle");
        textLabel.setAttribute("fill", "#94a3b8");
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

        const searchVal = memberSearch.value.toLowerCase().strip ? memberSearch.value.toLowerCase().trim() : '';
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
                <td>${m.applyDate}</td>
                <td>${statusInfo.renewalDueDate || '-'}</td>
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
            if (statusInfo.overdueDays > 0 && statusInfo.statusKey !== 'terminated' && statusInfo.statusKey !== 'deceased') {
                unpaidCount++;
                const tr = document.createElement('tr');
                
                const btnPayHtml = (role === 'member_admin')
                    ? `<button class="btn btn-success" style="padding:4px 8px; font-size:0.75rem;" onclick="openPaymentConfirmModal('${m.id}')"><i class="fa-solid fa-money-bill-wave"></i> ชำระเงิน</button>`
                    : `<span style="font-size:0.75rem; color:var(--text-muted);">ไม่มีสิทธิ์แก้ไข</span>`;

                tr.innerHTML = `
                    <td><strong>${m.id}</strong></td>
                    <td>${m.name}</td>
                    <td><span style="color:var(--status-grace); font-weight:500;">${statusInfo.renewalDueDate}</span></td>
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
                    <td>${log.paymentDate}</td>
                    <td><strong>${log.memberId}</strong></td>
                    <td>${memberName}</td>
                    <td>งวดปี ${log.year}</td>
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
                                  String(m.generation).includes(searchVal);
            return matchesSearch && m.status !== 'deceased';
        });

        if (filteredMembers.length === 0) {
            quickPayBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:20px;">ไม่พบรายชื่อสมาชิกเพื่อรับชำระเงินด่วน</td></tr>`;
            return;
        }

        filteredMembers.slice(0, 10).forEach(m => {
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
                <td>${m.lastPaymentDate || 'ไม่มีประวัติ'}</td>
                <td>${statusInfo.renewalDueDate || '-'}</td>
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
        document.getElementById('welfare-claim-date').value = systemDateStr;

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
        const claimDate = document.getElementById('welfare-claim-date').value;
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
            recordedBy: state.currentRole === 'welfare_admin' ? 'ผู้ดูแลสวัสดิการ' : 'กรรมการระบบ'
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
                <td>${w.claimDate}</td>
                <td><strong>${name}</strong> <small style="color:var(--text-muted); display:block;">รหัส: ${w.recipientId}</small></td>
                <td>${w.recipientType === 'member' ? 'สมาชิกชมรม' : 'อาจารย์'}</td>
                <td><span style="font-weight:600; color:var(--accent-blue);">${wTypeNames[w.welfareType] || w.welfareType}</span></td>
                <td><strong>${w.amount.toLocaleString('th-TH')}</strong> บาท</td>
                <td><small style="color:var(--text-secondary);">${w.details}</small></td>
                <td><small style="color:var(--text-muted);">${w.recordedBy || 'ระบบ'}</small></td>
                <td class="no-print">
                    <button class="icon-btn delete" onclick="deleteWelfareLog('${w.id}')" title="ลบรายการนี้" style="display:${state.currentRole === 'welfare_admin' ? 'inline-flex' : 'none'};"><i class="fa-solid fa-trash"></i></button>
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
                    <option value="active">Active เท่านั้น</option>
                    <option value="unpaid">ค้างชำระทั้งหมด</option>
                    <option value="terminated">สิ้นสภาพแล้ว</option>
                </select>
                <input type="number" id="report-member-gen" class="filter-select" placeholder="ระบุรุ่น (ว่าง = ทั้งหมด)" style="width:120px;">
            `;

            // ดักจับเมื่อผู้ใช้เปลี่ยนตัวกรองในหน้ารายงาน
            const statusSel = document.getElementById('report-member-status');
            const genInput = document.getElementById('report-member-gen');
            
            statusSel.addEventListener('change', runMemberReport);
            genInput.addEventListener('input', runMemberReport);

            runMemberReport();

            function runMemberReport() {
                const statusVal = statusSel.value;
                const genVal = genInput.value;

                let filtered = members.map(m => {
                    return { ...m, calculated: MembershipEngine.calculateMemberStatus(m, state.systemDate) };
                });

                if (statusVal === 'active') {
                    filtered = filtered.filter(m => m.calculated.statusKey === 'active' || m.calculated.statusKey === 'active_new');
                } else if (statusVal === 'unpaid') {
                    filtered = filtered.filter(m => m.calculated.overdueDays > 0 && m.calculated.statusKey !== 'terminated' && m.calculated.statusKey !== 'deceased');
                } else if (statusVal === 'terminated') {
                    filtered = filtered.filter(m => m.calculated.statusKey === 'terminated');
                }

                if (genVal) {
                    filtered = filtered.filter(m => String(m.generation) === genVal);
                }

                let html = `
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>รหัสสมาชิก</th>
                                <th>ชื่อ-นามสกุล (ชื่อเล่น)</th>
                                <th>รุ่น พ.น.</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>ที่อยู่ปัจจุบัน</th>
                                <th>ชำระล่าสุด</th>
                                <th>วันครบกำหนดรอบ</th>
                                <th>สถานะสมาชิก</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                if (filtered.length === 0) {
                    html += `<tr><td colspan="8" style="text-align:center; padding:20px;">ไม่พบรายการสมาชิกร่วมในเงื่อนไขการพิมพ์รายงาน</td></tr>`;
                } else {
                    filtered.forEach(m => {
                        html += `
                            <tr>
                                <td><strong>${m.id}</strong></td>
                                <td>${m.name} ${m.nickname ? `(${m.nickname})` : ''}</td>
                                <td>รุ่น ${m.generation}</td>
                                <td>${m.phone}</td>
                                <td><small>${m.address || '-'}</small></td>
                                <td>${m.lastPaymentDate || '-'}</td>
                                <td>${m.calculated.renewalDueDate || '-'}</td>
                                <td><strong>${m.calculated.statusText}</strong></td>
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
            let yearOptions = years.map(y => `<option value="${y}">งวดชำระประจำปี ${y}</option>`).join('');
            
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
                                <td>${f.paymentDate}</td>
                                <td><strong>${f.memberId}</strong></td>
                                <td>${m ? m.name : 'ไม่พบข้อมูล'}</td>
                                <td>${m ? `รุ่น ${m.generation}` : '-'}</td>
                                <td>งวดปี ${f.year}</td>
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
                                <td>${w.claimDate}</td>
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
    // 9. แท็บควบคุมจัดการฐานข้อมูลดิบ JSON (Settings Operations)
    // ==========================================================================
    const dbRawJson = document.getElementById('db-raw-json');
    const btnExport = document.getElementById('btn-export-db');
    const btnImport = document.getElementById('btn-import-db');
    const btnReset = document.getElementById('btn-reset-db');

    function renderSettingsTab() {
        // อัปเดตข้อมูลกล่องข้อความดิบ JSON
        const rawObj = db.exportBackup();
        dbRawJson.value = JSON.stringify(rawObj, null, 2);
    }

    btnExport.addEventListener('click', () => {
        const rawObj = db.exportBackup();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rawObj, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `bncc_club_db_backup_${state.systemDate}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("ดาวน์โหลดไฟล์สำรองข้อมูลสำเสร็จแล้ว");
    });

    btnImport.addEventListener('click', () => {
        const rawJson = dbRawJson.value;
        if (!rawJson.trim()) {
            alert("กรุณากรอกข้อมูล RAW JSON ลงในช่อง");
            return;
        }

        if (confirm("คำเตือน: การนำเข้าข้อมูลนี้จะเขียนทับฐานข้อมูลเดิมทั้งหมดบนอุปกรณ์ของคุณ ยืนยันดำเนินการ?")) {
            const res = db.importBackup(rawJson);
            if (res.success) {
                alert("นำเข้าฐานข้อมูลเรียบร้อยแล้ว ระบบจะทำการรีโหลดหน้าจอใหม่");
                refreshCurrentView();
            } else {
                alert(`ล้มเหลวในการนำเข้าข้อมูล: ${res.error}`);
            }
        }
    });

    btnReset.addEventListener('click', () => {
        if (confirm("คำเตือนอย่างสูง! คุณแน่ใจหรือไม่ที่จะล้างค่าข้อมูลระบบทั้งหมด? ข้อมูลการชำระเงินและรายการสมาชิกทั้งหมดจะกลับเป็นข้อมูลทดสอบตั้งต้น")) {
            db.reset();
            const set = db.getSettings();
            state.systemDate = set.systemDate;
            document.getElementById('system-date-input').value = state.systemDate;
            alert("ล้างข้อมูลเรียบร้อยแล้วและเขียนข้อมูลทดสอบเริ่มต้นทับแล้ว");
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
    document.getElementById('btn-add-member').addEventListener('click', () => {
        memberForm.reset();
        selectedBase64Photo = "";
        document.getElementById('member-photo-preview').innerHTML = `<i class="fa-solid fa-user"></i>`;
        document.getElementById('member-modal-title').innerText = "ลงทะเบียนสมัครสมาชิกใหม่";
        document.getElementById('member-form-mode').value = "add";
        document.getElementById('member-input-id').disabled = false;
        
        // กำหนดวันที่เริ่มต้น
        document.getElementById('member-input-apply-date').value = state.systemDate;
        document.getElementById('member-input-last-payment').value = state.systemDate;
        
        // รันไอดีถัดไปของรุ่นโดยประมาณ
        const members = db.getMembers();
        const nextIdNum = members.length + 1;
        document.getElementById('member-input-id').value = `75${String(nextIdNum).padStart(3, '0')}`;
        document.getElementById('member-input-gen').value = 75;

        openModal('modal-member-form');
    });

    // ฟังก์ชันเปิดแก้ไขข้อมูลสมาชิก
    window.openMemberEditModal = function(id) {
        const members = db.getMembers();
        const m = members.find(item => item.id === id);
        if (!m) return;

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
        document.getElementById('member-input-apply-date').value = m.applyDate;
        document.getElementById('member-input-birth-date').value = m.birthDate;
        document.getElementById('member-input-phone').value = m.phone;
        document.getElementById('member-input-line').value = m.lineId || '';
        document.getElementById('member-input-facebook').value = m.facebook || '';
        document.getElementById('member-input-occupation').value = m.occupation || '';
        document.getElementById('member-input-address').value = m.address || '';
        document.getElementById('member-input-edu-faculty').value = m.education ? `${m.education.faculty || ''}` : '';
        document.getElementById('member-input-last-payment').value = m.lastPaymentDate || '';
        
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
        const applyDate = document.getElementById('member-input-apply-date').value;
        const birthDate = document.getElementById('member-input-birth-date').value;
        const phone = document.getElementById('member-input-phone').value.trim();
        const line = document.getElementById('member-input-line').value.trim();
        const facebook = document.getElementById('member-input-facebook').value.trim();
        const occupation = document.getElementById('member-input-occupation').value.trim();
        const address = document.getElementById('member-input-address').value.trim();
        const eduFaculty = document.getElementById('member-input-edu-faculty').value.trim();
        const lastPayment = document.getElementById('member-input-last-payment').value;
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
            ageStr = `${sysY - birthY} ปี (${m.birthDate})`;
        }
        document.getElementById('detail-val-birth').innerText = ageStr;
        document.getElementById('detail-val-phone').innerText = m.phone || '-';
        document.getElementById('detail-val-gen').innerText = `รุ่น พ.น. ${m.generation}`;
        document.getElementById('detail-val-line').innerText = m.lineId || '-';
        document.getElementById('detail-val-facebook').innerText = m.facebook || '-';
        document.getElementById('detail-val-address').innerText = m.address || '-';
        document.getElementById('detail-val-education').innerText = m.education ? `${m.education.faculty || '-'}` : '-';
        document.getElementById('detail-val-occupation').innerText = m.occupation || '-';

        document.getElementById('detail-val-apply-date').innerText = m.applyDate || '-';
        document.getElementById('detail-val-last-payment').innerText = m.lastPaymentDate || 'ไม่มีข้อมูล';
        document.getElementById('detail-val-renewal-date').innerText = statusInfo.renewalDueDate || 'ไม่ครบกำหนด';
        
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
        document.getElementById('payment-confirm-current-renewal').innerText = `รอบต่ออายุเดิม: ${statusInfo.renewalDueDate || 'ยังไม่มีรอบชำระเงิน'}`;

        // ตั้งวันจ่ายเป็นวันที่จำลองในวันนี้
        document.getElementById('payment-input-date').value = state.systemDate;
        
        // ตั้งงวดปีตามปีของวันที่จำลองชำระเงิน
        document.getElementById('payment-input-year').value = new Date(state.systemDate).getFullYear();

        openModal('modal-confirm-payment');
    };

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const memberId = document.getElementById('payment-form-member-id').value;
        const date = document.getElementById('payment-input-date').value;
        const year = parseInt(document.getElementById('payment-input-year').value);
        const amount = 300;

        const newFee = {
            id: `F${String(db.getFees().length + 1).padStart(3, '0')}`,
            memberId: memberId,
            paymentDate: date,
            amount: amount,
            year: year,
            recordedBy: "ผู้ดูแลทะเบียนสมาชิก"
        };

        db.addFee(newFee);
        
        alert(`บันทึกรับเงินค่าบำรุงของสมาชิกรหัส ${memberId} ประจำงวดปี ${year} เรียบร้อยแล้ว`);
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
            if (username === 'admin.member' && password === 'member123') {
                role = 'member_admin';
                userName = 'คุณนารี ทะเบียนดี';
                roleText = 'ผู้ดูแลทะเบียนสมาชิก';
            } else if (username === 'admin.welfare' && password === 'welfare123') {
                role = 'welfare_admin';
                userName = 'นายสวัสดิ์ เกื้อกูล';
                roleText = 'ผู้ดูแลสวัสดิการ';
            } else if (username === 'executive' && password === 'exec123') {
                role = 'executive';
                userName = 'พล.ต.ต. สุชน ผู้นำพา';
                roleText = 'ผู้บริหาร/กรรมการชมรม';
            } else {
                alert('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
                return;
            }

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
            DOM.roleSelect.value = role;
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

    // ==========================================================================
    // 11. เริ่มต้นระบบการทำงานทั้งหมด (App Start)
    // ==========================================================================
    initLogin();
    initNavigation();
    initRoleAndDateControls();
    
    // อัปเดตเริ่มต้นกรณีเข้าใช้งานค้างเซสชันไว้
    if (state.isLoggedIn) {
        applyRolePermissions();
        setTimeout(() => {
            DOM.roleSelect.dispatchEvent(new Event('change'));
        }, 100);
    }
});
