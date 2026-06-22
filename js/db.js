// js/db.js
// ระบบฐานข้อมูลจำลองโดยใช้ localStorage สำหรับชมรมเพื่อน พ.น.

const DB_KEYS = {
    MEMBERS: 'bncc_club_members',
    TEACHERS: 'bncc_club_teachers',
    FEES: 'bncc_club_fees',
    WELFARES: 'bncc_club_welfares',
    SYSTEM_SETTINGS: 'bncc_club_settings'
};

// ข้อมูลเริ่มต้นสำหรับทดสอบระบบ (Seed Data)
const INITIAL_MEMBERS = [
    {
        id: "M69001",
        generation: 69,
        name: "นายสมชาย รักดี",
        nickname: "ชาย",
        applyDate: "2020-01-15",
        birthDate: "1998-05-12",
        phone: "081-234-5678",
        lineId: "somchai.r",
        facebook: "Somchai Rakdee",
        address: "123/45 ถนนราชดำเนิน แขวงบวรนิเวศ เขตพระนคร กรุงเทพฯ 10200",
        education: { gen: 69, faculty: "วิศวกรรมศาสตร์", major: "คอมพิวเตอร์" },
        emergencyContact: { name: "นางสมศรี รักดี", relationship: "มารดา", phone: "089-876-5432" },
        occupation: "วิศวกรซอฟต์แวร์",
        photo: "", // ใช้ SVG เริ่มต้นใน UI
        isReappliedAfterTermination: false,
        lastPaymentDate: "2025-06-20", // ต่ออายุล่าสุดตรงเวลา
        notes: "สมาชิกก่อตั้งรุ่น 69"
    },
    {
        id: "M69002",
        generation: 69,
        name: "นางสาวสมหญิง สวยงาม",
        nickname: "หญิง",
        applyDate: "2020-02-10",
        birthDate: "1998-11-23",
        phone: "082-345-6789",
        lineId: "ying.beautiful",
        facebook: "Ying Somying",
        address: "78/9 หมู่ 3 ตำบลบางกรวย อำเภอบางกรวย นนทบุรี 11130",
        education: { gen: 69, faculty: "อักษรศาสตร์", major: "ภาษาอังกฤษ" },
        emergencyContact: { name: "นายสมพงษ์ สวยงาม", relationship: "บิดา", phone: "085-432-1098" },
        occupation: "เจ้าหน้าที่ฝ่ายต่างประเทศ",
        photo: "",
        isReappliedAfterTermination: false,
        lastPaymentDate: "2025-06-10", // ต่ออายุล่าสุด
        notes: ""
    },
    {
        id: "M70001",
        generation: 70,
        name: "นายมานะ พากเพียร",
        nickname: "นะ",
        applyDate: "2021-05-20",
        birthDate: "1999-02-15",
        phone: "083-456-7890",
        lineId: "mana.peer",
        facebook: "Mana Pakpian",
        address: "456 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
        education: { gen: 70, faculty: "บริหารธุรกิจ", major: "การตลาด" },
        emergencyContact: { name: "นางมะลิ พากเพียร", relationship: "มารดา", phone: "084-567-8901" },
        occupation: "ผู้จัดการฝ่ายการตลาด",
        photo: "",
        isReappliedAfterTermination: false,
        lastPaymentDate: "2025-05-30", // ต่ออายุช้าเล็กน้อย แต่อยู่ในเกณฑ์ Active/Grace ในอดีต ปัจจุบันเป็น Grace period
        notes: ""
    },
    {
        id: "M71001",
        generation: 71,
        name: "นายวีระ กล้าหาญ",
        nickname: "วี",
        applyDate: "2022-08-12",
        birthDate: "2000-09-05",
        phone: "084-567-8901",
        lineId: "veera.brave",
        facebook: "Veera Klahan",
        address: "12/3 ถนนเพชรเกษม แขวงบางแค เขตบางแค กรุงเทพฯ 10160",
        education: { gen: 71, faculty: "วิทยาศาสตร์", major: "เคมี" },
        emergencyContact: { name: "นางวิภา กล้าหาญ", relationship: "ภรรยา", phone: "086-789-0123" },
        occupation: "นักวิจัยเคมี",
        photo: "",
        isReappliedAfterTermination: false,
        lastPaymentDate: "2025-05-10", // ชำระล่าช้าเกิน 30 วัน (สำหรับระบบเวลาปัจจุบัน 2026-06-22 จะต้องตรวจสอบสถานะ)
        notes: ""
    },
    {
        id: "M72001",
        generation: 72,
        name: "นางสาวปิติ ยินดี",
        nickname: "เปิ้ล",
        applyDate: "2023-10-01",
        birthDate: "2001-04-18",
        phone: "085-678-9012",
        lineId: "piti.yindee",
        facebook: "Piti Yindee",
        address: "99 ถนนจรัญสนิทวงศ์ แขวงบางอ้อ เขตบางพลัด กรุงเทพฯ 10700",
        education: { gen: 72, faculty: "นิเทศศาสตร์", major: "วารสารศาสตร์" },
        emergencyContact: { name: "นายประสิทธิ์ ยินดี", relationship: "บิดา", phone: "087-890-1234" },
        occupation: "ครีเอเตอร์อิสระ",
        photo: "",
        isReappliedAfterTermination: false,
        lastPaymentDate: "2025-02-15", // ขาดต่ออายุเกิน 90 วัน ณ ปัจจุบัน (2026-06-22) สิ้นสภาพ
        notes: ""
    },
    {
        id: "M75001",
        generation: 75,
        name: "นายเนตร ใหม่เอี่ยม",
        nickname: "เนตร",
        applyDate: "2026-05-10", // สมาชิกใหม่ เพิ่งสมัคร สมมติวันปัจจุบันคือ 2026-06-22 จะสมัครมาแล้ว 43 วัน (รอครบ 90 วัน)
        birthDate: "2004-07-30",
        phone: "086-789-1234",
        lineId: "nate.new",
        facebook: "Nate Newmember",
        address: "77/1 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900",
        education: { gen: 75, faculty: "เทคโนโลยีสารสนเทศ", major: "วิทยาการคอมพิวเตอร์" },
        emergencyContact: { name: "นายนำศักดิ์ ใหม่เอี่ยม", relationship: "บิดา", phone: "088-901-2345" },
        occupation: "นักศึกษา",
        photo: "",
        isReappliedAfterTermination: false,
        lastPaymentDate: "2026-05-10", // ชำระค่าบำรุงแรกเข้า
        notes: "สมาชิกใหม่รออนุมัติสิทธิ์ (Active New)"
    },
    {
        id: "M75002",
        generation: 75,
        name: "นายชูใจ ใจอารี",
        nickname: "ชู",
        applyDate: "2026-05-28", // สมัครใหม่หลังโดน Terminate (สมัครใหม่ รอ 30 วัน)
        birthDate: "2004-12-15",
        phone: "089-012-3456",
        lineId: "choojai.care",
        facebook: "Choojai Jai-aree",
        address: "34 ถนนสุขุมวิท 101 แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        education: { gen: 75, faculty: "ศิลปกรรมศาสตร์", major: "การออกแบบ" },
        emergencyContact: { name: "นางใจดี ใจอารี", relationship: "มารดา", phone: "090-123-4567" },
        occupation: "ดีไซเนอร์",
        photo: "",
        isReappliedAfterTermination: true, // เคยโดน Terminate แล้วสมัครใหม่
        lastPaymentDate: "2026-05-28", // ชำระค่าบำรุงวันสมัครใหม่
        notes: "สมัครใหม่หลังสิ้นสภาพ รอ 30 วัน"
    }
];

const INITIAL_TEACHERS = [
    {
        id: "T001",
        name: "อาจารย์สมพิศ เกียรติขจร",
        status: "teaching", // ปัจจุบันยังสอน
        phone: "081-111-2222",
        address: "55/2 ถนนสามเสน แขวงดุสิต เขตดุสิต กรุงเทพฯ 10300",
        notes: "อาจารย์แนะแนวและผู้ให้คำปรึกษาชมรม"
    },
    {
        id: "T002",
        name: "อาจารย์ประมวล มีความสุข",
        status: "retired", // เกษียณ
        phone: "082-222-3333",
        address: "88/4 หมู่ 5 ถนนรัตนาธิเบศร์ นนทบุรี 11000",
        notes: "อดีตอาจารย์สอนวิชาคณิตศาสตร์"
    },
    {
        id: "T003",
        name: "อาจารย์สุรพล ล่วงลับ",
        status: "deceased", // ถึงแก่กรรม
        phone: "-",
        address: "-",
        notes: "ถึงแก่กรรมเมื่อปี พ.ศ. 2568"
    }
];

// ประวัติการชำระค่าบำรุง (ชำระ 300 บาท/ปี)
const INITIAL_FEES = [
    { id: "F001", memberId: "M69001", paymentDate: "2024-06-15", amount: 300, year: 2024, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    { id: "F002", memberId: "M69001", paymentDate: "2025-06-20", amount: 300, year: 2025, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    
    { id: "F003", memberId: "M69002", paymentDate: "2024-06-08", amount: 300, year: 2024, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    { id: "F004", memberId: "M69002", paymentDate: "2025-06-10", amount: 300, year: 2025, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    
    { id: "F005", memberId: "M70001", paymentDate: "2024-05-25", amount: 300, year: 2024, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    { id: "F006", memberId: "M70001", paymentDate: "2025-05-30", amount: 300, year: 2025, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    
    { id: "F007", memberId: "M71001", paymentDate: "2024-05-02", amount: 300, year: 2024, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    { id: "F008", memberId: "M71001", paymentDate: "2025-05-10", amount: 300, year: 2025, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    
    { id: "F009", memberId: "M72001", paymentDate: "2024-02-10", amount: 300, year: 2024, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    { id: "F010", memberId: "M72001", paymentDate: "2025-02-15", amount: 300, year: 2025, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" }, // ชำระล่าสุด ก.พ. 2025 เลยกำหนดมานานแล้ว
    
    { id: "F011", memberId: "M75001", paymentDate: "2026-05-10", amount: 300, year: 2026, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" },
    { id: "F012", memberId: "M75002", paymentDate: "2026-05-28", amount: 300, year: 2026, recordedBy: "ผู้ดูแลทะเบียนสมาชิก" }
];

// ประวัติการจ่ายสวัสดิการ
const INITIAL_WELFARES = [
    {
        id: "W001",
        recipientId: "M69001",
        recipientType: "member",
        welfareType: "member_medical", // สมาชิกเจ็บป่วย
        claimDate: "2026-01-10",
        amount: 1500,
        details: "นอนรักษาตัวจากโรคไข้เลือดออก ณ โรงพยาบาลศิริราช (3 วัน)",
        recordedBy: "ผู้ดูแลสวัสดิการ"
    },
    {
        id: "W002",
        recipientId: "M69002",
        recipientType: "member",
        welfareType: "family_deceased", // ครอบครัวเสียชีวิต
        claimDate: "2025-09-05",
        amount: 2000,
        details: "บิดาถึงแก่กรรม จัดงานสวดพระอภิธรรม ณ วัดบวรนิเวศ",
        recordedBy: "ผู้ดูแลสวัสดิการ"
    },
    {
        id: "W003",
        recipientId: "T002",
        recipientType: "teacher",
        welfareType: "teacher_medical", // อาจารย์เจ็บป่วย
        claimDate: "2026-03-12",
        amount: 2000,
        details: "ผ่าตัดต้อกระจก พักรักษาตัว ณ โรงพยาบาลพญาไท",
        recordedBy: "ผู้ดูแลสวัสดิการ"
    },
    {
        id: "W004",
        recipientId: "T003",
        recipientType: "teacher",
        welfareType: "teacher_deceased", // อาจารย์ถึงแก่กรรม
        claimDate: "2025-11-20",
        amount: 2000,
        details: "อาจารย์สุรพล ถึงแก่กรรม ร่วมทำบุญฌาปนกิจศพ",
        recordedBy: "ผู้ดูแลสวัสดิการ"
    }
];

const INITIAL_SETTINGS = {
    systemDate: "2026-06-22", // วันที่จำลองตั้งต้น (มิถุนายน 2026 ตามใน Requirement)
    maintenanceFeeAmount: 300
};

// คลาสจัดการฐานข้อมูลจำลอง
class Database {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(DB_KEYS.SYSTEM_SETTINGS)) {
            localStorage.setItem(DB_KEYS.SYSTEM_SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        }
        if (!localStorage.getItem(DB_KEYS.MEMBERS)) {
            localStorage.setItem(DB_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
        }
        if (!localStorage.getItem(DB_KEYS.TEACHERS)) {
            localStorage.setItem(DB_KEYS.TEACHERS, JSON.stringify(INITIAL_TEACHERS));
        }
        if (!localStorage.getItem(DB_KEYS.FEES)) {
            localStorage.setItem(DB_KEYS.FEES, JSON.stringify(INITIAL_FEES));
        }
        if (!localStorage.getItem(DB_KEYS.WELFARES)) {
            localStorage.setItem(DB_KEYS.WELFARES, JSON.stringify(INITIAL_WELFARES));
        }
    }

    // ล้างข้อมูลกลับไปเป็นค่าเริ่มต้น
    reset() {
        localStorage.removeItem(DB_KEYS.SYSTEM_SETTINGS);
        localStorage.removeItem(DB_KEYS.MEMBERS);
        localStorage.removeItem(DB_KEYS.TEACHERS);
        localStorage.removeItem(DB_KEYS.FEES);
        localStorage.removeItem(DB_KEYS.WELFARES);
        this.init();
    }

    // ส่วนของ Settings
    getSettings() {
        return JSON.parse(localStorage.getItem(DB_KEYS.SYSTEM_SETTINGS));
    }

    saveSettings(settings) {
        localStorage.setItem(DB_KEYS.SYSTEM_SETTINGS, JSON.stringify(settings));
        // ส่ง Event แจ้งเตือนแอปพลิเคชันว่ามีการตั้งค่าเปลี่ยน
        window.dispatchEvent(new Event('db_updated'));
    }

    // ส่วนของ Members
    getMembers() {
        return JSON.parse(localStorage.getItem(DB_KEYS.MEMBERS)) || [];
    }

    saveMembers(members) {
        localStorage.setItem(DB_KEYS.MEMBERS, JSON.stringify(members));
        window.dispatchEvent(new Event('db_updated'));
    }

    addMember(member) {
        const members = this.getMembers();
        members.push(member);
        this.saveMembers(members);
    }

    updateMember(updatedMember) {
        const members = this.getMembers();
        const index = members.findIndex(m => m.id === updatedMember.id);
        if (index !== -1) {
            members[index] = updatedMember;
            this.saveMembers(members);
            return true;
        }
        return false;
    }

    // ส่วนของ Teachers
    getTeachers() {
        return JSON.parse(localStorage.getItem(DB_KEYS.TEACHERS)) || [];
    }

    saveTeachers(teachers) {
        localStorage.setItem(DB_KEYS.TEACHERS, JSON.stringify(teachers));
        window.dispatchEvent(new Event('db_updated'));
    }

    addTeacher(teacher) {
        const teachers = this.getTeachers();
        teachers.push(teacher);
        this.saveTeachers(teachers);
    }

    updateTeacher(updatedTeacher) {
        const teachers = this.getTeachers();
        const index = teachers.findIndex(t => t.id === updatedTeacher.id);
        if (index !== -1) {
            teachers[index] = updatedTeacher;
            this.saveTeachers(teachers);
            return true;
        }
        return false;
    }

    // ส่วนของ Fees
    getFees() {
        return JSON.parse(localStorage.getItem(DB_KEYS.FEES)) || [];
    }

    saveFees(fees) {
        localStorage.setItem(DB_KEYS.FEES, JSON.stringify(fees));
        window.dispatchEvent(new Event('db_updated'));
    }

    addFee(fee) {
        const fees = this.getFees();
        fees.push(fee);
        this.saveFees(fees);
        
        // หลังจากเพิ่มประวัติชำระเงินแล้ว ให้อัปเดตวันชำระล่าสุดที่ข้อมูลตัวสมาชิกด้วย
        const members = this.getMembers();
        const member = members.find(m => m.id === fee.memberId);
        if (member) {
            // ถ้าวันจ่ายเงินล่าสุดในข้อมูลประวัติใหม่นี้ ใหม่กว่าวันจ่ายเดิม ให้บันทึก
            if (!member.lastPaymentDate || fee.paymentDate > member.lastPaymentDate) {
                member.lastPaymentDate = fee.paymentDate;
                this.updateMember(member);
            }
        }
    }

    // ส่วนของ Welfares
    getWelfares() {
        return JSON.parse(localStorage.getItem(DB_KEYS.WELFARES)) || [];
    }

    saveWelfares(welfares) {
        localStorage.setItem(DB_KEYS.WELFARES, JSON.stringify(welfares));
        window.dispatchEvent(new Event('db_updated'));
    }

    addWelfare(welfare) {
        const welfares = this.getWelfares();
        welfares.push(welfare);
        this.saveWelfares(welfares);
    }

    // นำเข้าข้อมูลดิบทั้งหมด (JSON)
    importBackup(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.settings) localStorage.setItem(DB_KEYS.SYSTEM_SETTINGS, JSON.stringify(data.settings));
            if (data.members) localStorage.setItem(DB_KEYS.MEMBERS, JSON.stringify(data.members));
            if (data.teachers) localStorage.setItem(DB_KEYS.TEACHERS, JSON.stringify(data.teachers));
            if (data.fees) localStorage.setItem(DB_KEYS.FEES, JSON.stringify(data.fees));
            if (data.welfares) localStorage.setItem(DB_KEYS.WELFARES, JSON.stringify(data.welfares));
            this.init();
            window.dispatchEvent(new Event('db_updated'));
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    // ส่งออกข้อมูลดิบทั้งหมดเป็นวัตถุ
    exportBackup() {
        return {
            settings: this.getSettings(),
            members: this.getMembers(),
            teachers: this.getTeachers(),
            fees: this.getFees(),
            welfares: this.getWelfares()
        };
    }
}

const db = new Database();
