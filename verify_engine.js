// verify_engine.js
// สคริปต์ทดสอบตรรกะคำนวณสถานะและสิทธิ์สวัสดิการผ่าน Node.js

const fs = require('fs');
const path = require('path');

// อ่านไฟล์ engine.js
const enginePath = path.join(__dirname, 'js/engine.js');
if (!fs.existsSync(enginePath)) {
    console.error("Error: engine.js not found at " + enginePath);
    process.exit(1);
}

const engineCode = fs.readFileSync(enginePath, 'utf8');

// จำลองตัวแปร window สำหรับ Node.js
const mockWindow = {};
try {
    const runInContext = new Function('window', engineCode);
    runInContext(mockWindow);
} catch (e) {
    console.error("Syntax Error or load failure in engine.js:", e);
    process.exit(1);
}

const Engine = mockWindow.MembershipEngine;
if (!Engine) {
    console.error("Error: MembershipEngine was not exported properly.");
    process.exit(1);
}

console.log("=== STARTING AUTOMATED TEST CASES ===");
let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`[PASS] ${message}`);
        passed++;
    } else {
        console.error(`[FAIL] ${message}`);
        failed++;
    }
}

// วันที่ระบบจำลองหลัก
const SYSTEM_DATE = "2026-06-22";

// ----------------------------------------------------
// 1. ทดสอบการต่ออายุอัตโนมัติ (calculateRenewalDueDate)
// ----------------------------------------------------
const renewalDate = Engine.calculateRenewalDueDate("2025-06-20");
assert(renewalDate === "2026-06-20", `Renewal date check (2025-06-20 + 1y = 2026-06-20) -> Got ${renewalDate}`);

// ----------------------------------------------------
// 2. ทดสอบคำนวณสถานะสมาชิก
// ----------------------------------------------------

// กรณี Active ปกติ (ชำระล่าสุดไม่เกิน 1 ปี)
const memberActive = {
    id: "M69001",
    applyDate: "2020-01-15",
    lastPaymentDate: "2025-06-25", // ครบกำหนด 2026-06-25 (ยังเหลือเวลาอีก 3 วัน)
    isReappliedAfterTermination: false
};
const resActive = Engine.calculateMemberStatus(memberActive, SYSTEM_DATE);
assert(resActive.statusKey === "active", `Active status: Expected active, Got ${resActive.statusKey} (Reason: ${resActive.reason})`);
assert(resActive.eligible === true, "Active status should be eligible for welfare");

// กรณี Active (Grace Period) (เลยกำหนดชำระไม่เกิน 30 วัน)
const memberGrace = {
    id: "M69002",
    applyDate: "2020-01-15",
    lastPaymentDate: "2025-06-10", // ครบกำหนด 2026-06-10 (เลยกำหนดชำระมา 12 วัน)
    isReappliedAfterTermination: false
};
const resGrace = Engine.calculateMemberStatus(memberGrace, SYSTEM_DATE);
assert(resGrace.statusKey === "grace_period", `Grace Period check: Expected grace_period, Got ${resGrace.statusKey}`);
assert(resGrace.overdueDays === 12, `Grace Period overdue days: Expected 12, Got ${resGrace.overdueDays}`);
assert(resGrace.eligible === true, "Grace Period should still be eligible for welfare");

// กรณี Suspended (เลยกำหนดชำระ 31 - 90 วัน)
const memberSuspended = {
    id: "M71001",
    applyDate: "2022-08-12",
    lastPaymentDate: "2025-05-10", // ครบกำหนด 2026-05-10 (เลยกำหนดชำระมา 43 วัน)
    isReappliedAfterTermination: false
};
const resSuspended = Engine.calculateMemberStatus(memberSuspended, SYSTEM_DATE);
assert(resSuspended.statusKey === "suspended", `Suspended check: Expected suspended, Got ${resSuspended.statusKey}`);
assert(resSuspended.eligible === false, "Suspended status should NOT be eligible for welfare");

// กรณี Membership Terminated (เลยกำหนดชำระเกิน 90 วัน)
const memberTerminated = {
    id: "M72001",
    applyDate: "2023-10-01",
    lastPaymentDate: "2025-02-15", // ครบกำหนด 2026-02-15 (เลยกำหนดชำระมา 127 วัน)
    isReappliedAfterTermination: false
};
const resTerminated = Engine.calculateMemberStatus(memberTerminated, SYSTEM_DATE);
assert(resTerminated.statusKey === "terminated", `Terminated check: Expected terminated, Got ${resTerminated.statusKey}`);
assert(resTerminated.eligible === false, "Terminated status should NOT be eligible for welfare");

// กรณี Active New - สมาชิกใหม่รอสิทธิ์ครบ 90 วัน
const memberNew = {
    id: "M75001",
    applyDate: "2026-05-10", // สมัครมาแล้ว 43 วัน (< 90 วัน)
    lastPaymentDate: "2026-05-10",
    isReappliedAfterTermination: false
};
const resNew = Engine.calculateMemberStatus(memberNew, SYSTEM_DATE);
assert(resNew.statusKey === "active_new", `Active New check: Expected active_new, Got ${resNew.statusKey}`);
assert(resNew.eligible === false, "Active New should NOT be eligible for welfare during waiting period");

// กรณี Active New Reapplied - สมัครใหม่หลัง Terminate รอครบ 30 วัน (พ้นระยะแล้ว)
const memberReappliedPassed = {
    id: "M75002",
    applyDate: "2026-05-10", // สมัครมาแล้ว 43 วัน (> 30 วัน)
    lastPaymentDate: "2026-05-10",
    isReappliedAfterTermination: true
};
const resReappliedPassed = Engine.calculateMemberStatus(memberReappliedPassed, SYSTEM_DATE);
assert(resReappliedPassed.statusKey === "active", `Reapplied Passed check: Expected active, Got ${resReappliedPassed.statusKey}`);
assert(resReappliedPassed.eligible === true, "Reapplied member who passed 30 days should be eligible");

// ----------------------------------------------------
// 3. ทดสอบขีดจำกัดสวัสดิการ (Welfare Limits Check)
// ----------------------------------------------------

// สมาชิกปกติเคลมเจ็บป่วยครั้งแรกของปี
const welfaresList = [];
const claimVerdict1 = Engine.checkWelfareEligibility(
    memberActive,
    "member",
    "member_medical",
    SYSTEM_DATE,
    welfaresList,
    SYSTEM_DATE
);
assert(claimVerdict1.eligible === true, "First medical claim of year should be approved");

// สมาชิกเจ็บป่วยไปแล้ว 2 ครั้งในรอบปีปัจจุบัน
const welfaresListFilled = [
    { recipientId: "M69001", recipientType: "member", welfareType: "member_medical", claimDate: "2026-02-10", amount: 1500 },
    { recipientId: "M69001", recipientType: "member", welfareType: "member_medical", claimDate: "2026-04-12", amount: 1500 }
];
const claimVerdict2 = Engine.checkWelfareEligibility(
    memberActive,
    "member",
    "member_medical",
    SYSTEM_DATE,
    welfaresListFilled,
    SYSTEM_DATE
);
assert(claimVerdict2.eligible === false, "Third medical claim of year should be rejected due to limit (max 2/year)");

// สมาชิกที่เสียชีวิตไปแล้ว เคลมเจ็บป่วยไม่ได้
const deceasedMember = {
    id: "M69001",
    applyDate: "2020-01-15",
    lastPaymentDate: "2025-06-25",
    isDeceased: true
};
const claimVerdictDeceased = Engine.checkWelfareEligibility(
    deceasedMember,
    "member",
    "member_medical",
    SYSTEM_DATE,
    welfaresList,
    SYSTEM_DATE
);
assert(claimVerdictDeceased.eligible === false, "Deceased member cannot claim medical welfare");

console.log(`\n=== TEST SUMMARY: Passed: ${passed}, Failed: ${failed} ===`);
if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
