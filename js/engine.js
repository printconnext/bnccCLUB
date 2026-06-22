// js/engine.js
// เอนจินคำนวณสถานะสมาชิกอัตโนมัติและตรวจสอบสิทธิ์สวัสดิการ (ชมรมเพื่อน พ.น.)

const MembershipEngine = {
    // แปลงสตริงวันที่เป็น Object Date
    parseDate(dateStr) {
        return new Date(dateStr);
    },

    // จัดรูปแบบ Date เป็น YYYY-MM-DD
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // คำนวณวันครบกำหนดต่ออายุ (1 ปีหลังจากวันที่ชำระค่าบำรุงล่าสุด)
    calculateRenewalDueDate(lastPaymentDateStr) {
        if (!lastPaymentDateStr) return null;
        const lastPayment = this.parseDate(lastPaymentDateStr);
        // บวกไป 1 ปี
        const renewalDate = new Date(lastPayment);
        renewalDate.setFullYear(lastPayment.getFullYear() + 1);
        return this.formatDate(renewalDate);
    },

    // คำนวณจำนวนวันต่างกัน (Date1 - Date2)
    getDaysDifference(dateStr1, dateStr2) {
        const d1 = this.parseDate(dateStr1);
        const d2 = this.parseDate(dateStr2);
        
        // ตั้งเวลาเป็น 00:00:00 เพื่อเปรียบเทียบเฉพาะวันที่
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        
        const diffMs = d1.getTime() - d2.getTime();
        return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    },

    // คำนวณสถานะสมาชิกอัตโนมัติ
    calculateMemberStatus(member, systemDateStr) {
        // หากสมาชิกเสียชีวิตแล้ว (ตรวจสอบจากข้อมูล หรือประวัติการได้รับสวัสดิการถึงแก่กรรม)
        if (member.isDeceased || member.status === 'deceased') {
            return {
                statusKey: 'deceased',
                statusText: 'ถึงแก่กรรม',
                overdueDays: 0,
                daysRemaining: 0,
                renewalDueDate: null,
                eligible: false,
                reason: 'สมาชิกถึงแก่กรรม'
            };
        }

        const applyDate = member.applyDate;
        const lastPaymentDate = member.lastPaymentDate;
        const isReapplied = member.isReappliedAfterTermination || false;

        // คำนวณวันครบกำหนดต่ออายุ
        const renewalDueDate = this.calculateRenewalDueDate(lastPaymentDate);
        if (!renewalDueDate) {
            return {
                statusKey: 'unknown',
                statusText: 'ไม่มีข้อมูลการชำระเงิน',
                overdueDays: 0,
                daysRemaining: 0,
                renewalDueDate: null,
                eligible: false,
                reason: 'ไม่มีประวัติการชำระเงินค่าบำรุง'
            };
        }

        // คำนวณ overdueDays (จำนวนวันเกินกำหนดชำระ)
        const overdueDays = this.getDaysDifference(systemDateStr, renewalDueDate);
        const daysSinceApply = this.getDaysDifference(systemDateStr, applyDate);
        const daysRemaining = -overdueDays; // วันที่เหลือก่อนครบกำหนดชำระ

        // 1. ตรวจสอบกรณีขาดต่ออายุเกิน 90 วัน (Membership Terminated)
        if (overdueDays > 90) {
            return {
                statusKey: 'terminated',
                statusText: 'สิ้นสภาพสมาชิก',
                overdueDays: overdueDays,
                daysRemaining: 0,
                renewalDueDate: renewalDueDate,
                eligible: false,
                reason: `ขาดการต่ออายุเกิน 90 วัน (เกินกำหนดมาแล้ว ${overdueDays} วัน) ต้องสมัครใหม่และรอสิทธิ์`
            };
        }

        // 2. ตรวจสอบกรณีค้างชำระ 31 - 90 วัน (Suspended)
        if (overdueDays >= 31 && overdueDays <= 90) {
            return {
                statusKey: 'suspended',
                statusText: 'ระงับสิทธิ์ชั่วคราว',
                overdueDays: overdueDays,
                daysRemaining: 0,
                renewalDueDate: renewalDueDate,
                eligible: false,
                reason: `ค้างชำระค่าบำรุงเกิน 30 วัน (เกินกำหนดมาแล้ว ${overdueDays} วัน) คืนสิทธิ์ทันทีเมื่อชำระเงิน`
            };
        }

        // 3. ตรวจสอบกรณีสมาชิกใหม่ ยังรอสิทธิ์ไม่ครบกำหนด (Active New)
        // กรณีสมัครใหม่ทั่วไป รอครบ 90 วัน
        // กรณีสมัครใหม่หลังสิ้นสภาพ (Reapplied) รอครบ 30 วัน
        const waitingPeriod = isReapplied ? 30 : 90;
        if (daysSinceApply < waitingPeriod) {
            const daysLeft = waitingPeriod - daysSinceApply;
            return {
                statusKey: 'active_new',
                statusText: 'สมาชิกใหม่รอสิทธิ์',
                overdueDays: overdueDays > 0 ? overdueDays : 0,
                daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
                renewalDueDate: renewalDueDate,
                eligible: false,
                reason: `สมาชิกใหม่ อยู่ในช่วงรอสิทธิ์ ${waitingPeriod} วัน (เหลืออีก ${daysLeft} วันจะได้รับสิทธิ์)`
            };
        }

        // 4. ตรวจสอบกรณีต่ออายุล่าช้าไม่เกิน 30 วัน (Active Grace Period)
        if (overdueDays > 0 && overdueDays <= 30) {
            return {
                statusKey: 'grace_period',
                statusText: 'Active (Grace Period)',
                overdueDays: overdueDays,
                daysRemaining: 0,
                renewalDueDate: renewalDueDate,
                eligible: true,
                reason: `เกินกำหนดต่ออายุล่าช้า ${overdueDays} วัน (อนุโลมให้รับสวัสดิการได้ถึง 30 วัน)`
            };
        }

        // 5. กรณีปกติ (Active)
        return {
            statusKey: 'active',
            statusText: 'Active',
            overdueDays: 0,
            daysRemaining: daysRemaining,
            renewalDueDate: renewalDueDate,
            eligible: true,
            reason: 'สถานะปกติ ชำระค่าบำรุงเรียบร้อย'
        };
    },

    // ตรวจสอบสิทธิ์การขอรับสวัสดิการ
    checkWelfareEligibility(recipient, recipientType, welfareType, claimDateStr, welfaresList, systemDateStr) {
        const year = this.parseDate(claimDateStr).getFullYear();

        // 1. ตรวจสอบกรณีของ อาจารย์ (Teacher)
        if (recipientType === 'teacher') {
            // อาจารย์เสียชีวิตไปแล้ว จะขอสวัสดิการเจ็บป่วยไม่ได้
            if (recipient.status === 'deceased' && welfareType !== 'teacher_deceased') {
                return {
                    eligible: false,
                    reason: 'ไม่สามารถทำรายการได้เนื่องจากอาจารย์ถึงแก่กรรมแล้ว'
                };
            }

            if (welfareType === 'teacher_deceased') {
                // ตรวจสอบว่าเคยรับสวัสดิการเสียชีวิตไปหรือยัง
                const alreadyClaimed = welfaresList.some(w => 
                    w.recipientId === recipient.id && 
                    w.recipientType === 'teacher' && 
                    w.welfareType === 'teacher_deceased'
                );
                if (alreadyClaimed) {
                    return { eligible: false, reason: 'อาจารย์ท่านนี้เคยได้รับสวัสดิการถึงแก่กรรมไปแล้ว' };
                }
                return { eligible: true, maxAmount: 2000, currentUsed: 0, remainingLimit: 2000 };
            }

            if (welfareType === 'teacher_medical') {
                // เยี่ยมไข้เจ็บป่วยพักรักษาตัว 3 วันขึ้นไป: ไม่เกิน 2,000 บาท/ครั้ง และ ไม่เกิน 1 ครั้งต่อปีปฏิทิน
                const yearlyClaims = welfaresList.filter(w => {
                    const claimYear = this.parseDate(w.claimDate).getFullYear();
                    return w.recipientId === recipient.id && 
                           w.recipientType === 'teacher' && 
                           w.welfareType === 'teacher_medical' && 
                           claimYear === year;
                });

                if (yearlyClaims.length >= 1) {
                    return { 
                        eligible: false, 
                        reason: `อาจารย์ท่านนี้ได้ใช้สิทธิ์เยี่ยมไข้ครบโควต้าประจำปี ${year} แล้ว (จำกัด 1 ครั้ง/ปี)` 
                    };
                }
                return { eligible: true, maxAmount: 2000, currentUsed: yearlyClaims.length, remainingLimit: 2000 };
            }

            return { eligible: false, reason: 'ไม่พบประเภทสวัสดิการอาจารย์ที่ระบุ' };
        }

        // 2. ตรวจสอบกรณีของ สมาชิก (Member)
        if (recipientType === 'member') {
            // คำนวณสถานะสมาชิกล่าสุดตามระบบเวลา
            const statusInfo = this.calculateMemberStatus(recipient, systemDateStr);
            
            // กรณีเป็นสมาชิกเสียชีวิต
            if (statusInfo.statusKey === 'deceased' && welfareType !== 'member_deceased') {
                return {
                    eligible: false,
                    reason: 'ไม่สามารถขอสวัสดิการนี้ได้เนื่องจากสมาชิกถึงแก่กรรมแล้ว'
                };
            }

            // ตรวจสอบสิทธิ์ทางสถานะสมาชิก
            // สมาชิกใหม่ (Active New), ถูกระงับ (Suspended), หรือ สิ้นสภาพ (Terminated) ไม่มีสิทธิ์รับสวัสดิการ
            if (!statusInfo.eligible && welfareType !== 'member_deceased') {
                // ยกเว้นกรณีแจ้งสมาชิกเสียชีวิตหลังสิ้นสภาพไม่นาน หรือมีสิทธิ์บางประการ แต่ตามกฎต้องเคลียร์สถานะก่อน
                // แต่หากขอเบิกสวัสดิการทั่วไป ให้ยึดตามระบบควบคุมสิทธิ์
                return {
                    eligible: false,
                    reason: `ไม่ได้รับสิทธิ์สวัสดิการเนื่องจากสถานะสมาชิกเป็น [${statusInfo.statusText}]: ${statusInfo.reason}`
                };
            }

            // เฉพาะสมาชิกเสียชีวิต จะต้องเช็คสถานะ ณ วันที่เสียชีวิตว่าก่อนหน้านั้นปกติไหม แต่ในระบบจำลองเราเช็คจากสถานะปัจจุบัน
            if (welfareType === 'member_deceased') {
                // ตรวจสอบสิทธิ์ว่าเคยเบิกหรือยัง
                const alreadyClaimed = welfaresList.some(w => 
                    w.recipientId === recipient.id && 
                    w.recipientType === 'member' && 
                    w.welfareType === 'member_deceased'
                );
                if (alreadyClaimed) {
                    return { eligible: false, reason: 'สมาชิกท่านนี้เคยได้รับสวัสดิการถึงแก่กรรมไปแล้ว' };
                }

                // สิทธิ์การเคลมกรณีสมาชิกเสียชีวิต ต้องไม่ใช่สมาชิกใหม่ที่ยังไม่พ้นระยะรอสิทธิ์ และไม่ใช่สมาชิกสิ้นสภาพ
                if (statusInfo.statusKey === 'active_new') {
                    return { eligible: false, reason: `ไม่สามารถเบิกได้เนื่องจากสมาชิกเสียชีวิตในช่วงรอสิทธิ์สมัครใหม่ (${statusInfo.reason})` };
                }
                if (statusInfo.statusKey === 'terminated') {
                    return { eligible: false, reason: 'ไม่สามารถเบิกได้เนื่องจากสมาชิกสิ้นสภาพการเป็นสมาชิกชมรมก่อนถึงแก่กรรม' };
                }
                
                return { eligible: true, maxAmount: 5000, currentUsed: 0, remainingLimit: 5000 };
            }

            // ครอบครัวถึงแก่กรรม (บิดา มารดา คู่สมรส บุตร) - ไม่เกิน 2,000 บาท
            if (welfareType === 'family_deceased') {
                return { eligible: true, maxAmount: 2000, currentUsed: 0, remainingLimit: 2000 };
            }

            // เจ็บป่วยพักรักษาตัว 3 วันขึ้นไป (เยี่ยมไข้) - ไม่เกินครั้งละ 1,500 บาท (ไม่เกิน 2 ครั้ง/ปีปฏิทิน)
            if (welfareType === 'member_medical') {
                const yearlyClaims = welfaresList.filter(w => {
                    const claimYear = this.parseDate(w.claimDate).getFullYear();
                    return w.recipientId === recipient.id && 
                           w.recipientType === 'member' && 
                           w.welfareType === 'member_medical' && 
                           claimYear === year;
                });

                if (yearlyClaims.length >= 2) {
                    return { 
                        eligible: false, 
                        reason: `สมาชิกท่านนี้ใช้สิทธิ์เยี่ยมไข้ครบกำหนดประจำปี ${year} แล้ว (จำกัด 2 ครั้ง/ปี, ใช้ไปแล้ว 2 ครั้ง)` 
                    };
                }
                return { 
                    eligible: true, 
                    maxAmount: 1500, 
                    currentUsed: yearlyClaims.length, 
                    remainingLimit: 1500,
                    note: `ปีนี้ใช้สิทธิ์ไปแล้ว ${yearlyClaims.length} ครั้ง (เหลืออีก ${2 - yearlyClaims.length} ครั้ง)`
                };
            }

            return { eligible: false, reason: 'ไม่พบประเภทสวัสดิการสมาชิกที่ระบุ' };
        }

        return { eligible: false, reason: 'ประเภทผู้รับสวัสดิการไม่ถูกต้อง' };
    }
};

// แนบตัวแปรเข้า global object เพื่อใช้งานร่วมกันในไฟล์อื่น
window.MembershipEngine = MembershipEngine;
