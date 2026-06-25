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
        "id": "01083",
        "generation": 1,
        "name": "คุณอุเทน รุ่งเช้า",
        "nickname": "",
        "applyDate": "2016-01-05",
        "birthDate": "",
        "phone": "099-186-1241",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-01-30",
        "notes": ""
    },
    {
        "id": "03003",
        "generation": 3,
        "name": "คุณมานพ อมรเศรษฐชัย",
        "nickname": "",
        "applyDate": "2016-01-26",
        "birthDate": "",
        "phone": "081-812-3111",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-02-03",
        "notes": "ยกเลิกสมาชิก"
    },
    {
        "id": "07001",
        "generation": 7,
        "name": "คุณพัชนี ดำรงพิทักษ์กุล",
        "nickname": "",
        "applyDate": "2016-01-28",
        "birthDate": "",
        "phone": "081-912-6892",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-01-06",
        "notes": ""
    },
    {
        "id": "02004",
        "generation": 2,
        "name": "คุณอุไรวรรณ สุทธิลักษณวนิช",
        "nickname": "",
        "applyDate": "2016-01-28",
        "birthDate": "",
        "phone": "086-503-3413",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-12-01",
        "notes": ""
    },
    {
        "id": "01084",
        "generation": 1,
        "name": "คุณนัทธีรา กิตติวังชัย",
        "nickname": "นัท",
        "applyDate": "2016-01-29",
        "birthDate": "1952-12-05",
        "phone": "081-647-2720",
        "lineId": "",
        "facebook": "",
        "email": "Siampatlace@hotmail.com",
        "address": "100/191 มบ.อมรพันธุ์ 9 ถ.เสนานิคม 1 ซ.42แยก16 ลาดพร้าว ลาดพร้าว กรุงเทพฯ 10230",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-01-11",
        "notes": "สกุลเดิม/หมายเหตุ: /นิลจรัสวณิช"
    },
    {
        "id": "07002",
        "generation": 7,
        "name": "คุณจุไรรัศมี ศรีเพ็ญ",
        "nickname": "จุ",
        "applyDate": "2016-01-29",
        "birthDate": "1959-05-30",
        "phone": "081-335-0329",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "329 ซ.อ่อนนุช 10 อ่อนนุช สวนหลวง กรุงเทพฯ 10250",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-12",
        "notes": ""
    },
    {
        "id": "04001",
        "generation": 4,
        "name": "คุณธีระพงษ์ ฟูตระกูล",
        "nickname": "",
        "applyDate": "2018-01-31",
        "birthDate": "",
        "phone": "081-813-6469",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 4,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-02",
        "notes": ""
    },
    {
        "id": "12003",
        "generation": 12,
        "name": "คุณสมพร จิรธนาศักดิ์",
        "nickname": "",
        "applyDate": "2021-08-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-08-26",
        "notes": ""
    },
    {
        "id": "01122",
        "generation": 1,
        "name": "คุณลัดดา จินตามฤทธิ",
        "nickname": "",
        "applyDate": "2019-01-29",
        "birthDate": "",
        "phone": "088-663-9993",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-01-31",
        "notes": ""
    },
    {
        "id": "05001",
        "generation": 5,
        "name": "คุณนงนุช นูพิมพ์",
        "nickname": "",
        "applyDate": "2016-02-01",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-02-05",
        "notes": ""
    },
    {
        "id": "07004",
        "generation": 7,
        "name": "คุณกัญญา สุทธมนัสวงษ์",
        "nickname": "ใหญ่",
        "applyDate": "2016-02-01",
        "birthDate": "",
        "phone": "081-817-7880",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-09",
        "notes": ""
    },
    {
        "id": "09001",
        "generation": 9,
        "name": "คุณวีระเนศวร์ ศรีวัฒนวนชัย",
        "nickname": "",
        "applyDate": "2016-02-08",
        "birthDate": "",
        "phone": "099-220-6456",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-04",
        "notes": ""
    },
    {
        "id": "01085",
        "generation": 1,
        "name": "คุณรัชนี ตปะนียะกุล",
        "nickname": "เล็ก",
        "applyDate": "2016-02-09",
        "birthDate": "1952-09-07",
        "phone": "065-994-9915",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "234/153 ซ.นันทศิริ 7 มบ.นันทวัน ถ.ศรีนครินทร์ บางเมือง เมือง สมุทรปราการ 10270",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-02-05",
        "notes": ""
    },
    {
        "id": "02011",
        "generation": 2,
        "name": "คุณกมล จิววุฒิพงค์",
        "nickname": "",
        "applyDate": "2016-02-20",
        "birthDate": "",
        "phone": "081-865-2174",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "21/ 432 ม.ถาวรนิเวศน์ 2 ซ.บางนา-ตราด 12 ถ.บางนา-ตราด บางนา บางนา กทม 10260",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-03-19",
        "notes": ""
    },
    {
        "id": "02015",
        "generation": 2,
        "name": "คุณบัณฑิต เสงี่ยมสิน",
        "nickname": "",
        "applyDate": "2016-02-26",
        "birthDate": "",
        "phone": "081-170-9102",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-02-13",
        "notes": ""
    },
    {
        "id": "01086",
        "generation": 1,
        "name": "คุณปริญญา จุลสุคนธ์",
        "nickname": "",
        "applyDate": "2016-02-29",
        "birthDate": "",
        "phone": "081-454-9100",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-03-06",
        "notes": ""
    },
    {
        "id": "01087",
        "generation": 1,
        "name": "คุณไพศาล จิตไพศาลสุข",
        "nickname": "",
        "applyDate": "2016-02-29",
        "birthDate": "",
        "phone": "081-495-6904",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-05-22",
        "notes": ""
    },
    {
        "id": "01088",
        "generation": 1,
        "name": "คุณฉันทกร รุจศรีสาคร",
        "nickname": "หมู",
        "applyDate": "2016-02-29",
        "birthDate": "1953-12-21",
        "phone": "081-816-7654",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "4/65 คลองขวาง ไทรน้อย นนทบุรี 11150",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-02-11",
        "notes": ""
    },
    {
        "id": "01089",
        "generation": 1,
        "name": "คุณพรยศ",
        "nickname": "",
        "applyDate": "2016-03-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-06-04",
        "notes": "สกุลเดิม/หมายเหตุ: คำรณ"
    },
    {
        "id": "03007",
        "generation": 3,
        "name": "คุณวิชัย เมฆรังมินต์",
        "nickname": "",
        "applyDate": "2016-03-09",
        "birthDate": "",
        "phone": "089-0242505",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-05-26",
        "notes": ""
    },
    {
        "id": "03008",
        "generation": 3,
        "name": "คุณณภาพร  อมรเศรษฐชัย",
        "nickname": "",
        "applyDate": "2016-03-13",
        "birthDate": "",
        "phone": "084-018-8831",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-02-03",
        "notes": ""
    },
    {
        "id": "01090",
        "generation": 1,
        "name": "คุณลัดดา อัครวราวงศ์",
        "nickname": "",
        "applyDate": "2016-03-13",
        "birthDate": "",
        "phone": "089-199-9014",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-03-24",
        "notes": "สกุลเดิม/หมายเหตุ: ตั้งพจน์ทวีพร (นามสกุลใหม่)"
    },
    {
        "id": "05005",
        "generation": 5,
        "name": "คุณสุวรีย์ เราประจงดังไพศาล",
        "nickname": "",
        "applyDate": "2016-03-13",
        "birthDate": "",
        "phone": "086-344-9648",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-03-13",
        "notes": ""
    },
    {
        "id": "01108",
        "generation": 1,
        "name": "คุณสุเทพ ศิริพิทยาคุณกิจ",
        "nickname": "",
        "applyDate": "2017-03-02",
        "birthDate": "",
        "phone": "095-542-5914",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "127/5 ถนนมหานคร มหาพฤฒาราม บางรัก กทม 10500",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-01",
        "notes": ""
    },
    {
        "id": "01114",
        "generation": 1,
        "name": "คุณมนตรี รัฐประเสริฐ",
        "nickname": "*0831",
        "applyDate": "2021-08-14",
        "birthDate": "",
        "phone": "089-754-5799",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "243/1 ถ.เพชรเกษม ปากคลอง ภาษีเจริญ กทม 10160",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-08-14",
        "notes": ""
    },
    {
        "id": "13011",
        "generation": 13,
        "name": "คุณฉวีวรรณ สุริหาร",
        "nickname": "",
        "applyDate": "2021-03-07",
        "birthDate": "",
        "phone": "081-5514642",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-03-10",
        "notes": ""
    },
    {
        "id": "01134",
        "generation": 1,
        "name": "คุณสมชาย นาทะพันธ์",
        "nickname": "",
        "applyDate": "2021-03-11",
        "birthDate": "",
        "phone": "081-941-6749",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-01",
        "notes": ""
    },
    {
        "id": "03004",
        "generation": 3,
        "name": "คุณมาโนช จุลสุคนธ์",
        "nickname": "",
        "applyDate": "2024-03-28",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-03-28",
        "notes": ""
    },
    {
        "id": "05006",
        "generation": 5,
        "name": "คุณไพรัตน์ ศรีทา",
        "nickname": "โกร่ง",
        "applyDate": "2016-04-05",
        "birthDate": "1957-12-25",
        "phone": "091-078-0955",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "44/1 หมู่ 1 ซ.พร้อมมิตร 5 บางเมือง เมือง สมุทรปราการ 10270",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01092",
        "generation": 1,
        "name": "คุณสุรีย์ เหลืองศรีอำพร",
        "nickname": "",
        "applyDate": "2016-04-23",
        "birthDate": "",
        "phone": "089-441-9274",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-04-14",
        "notes": ""
    },
    {
        "id": "01093",
        "generation": 1,
        "name": "คุณสุรลักษณ์ ปิยะทัต",
        "nickname": "",
        "applyDate": "2016-04-25",
        "birthDate": "",
        "phone": "080-595-0828",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-05-30",
        "notes": ""
    },
    {
        "id": "01094",
        "generation": 1,
        "name": "คุณทัศนีย์ ศรีทองเย็น",
        "nickname": "จ๋า",
        "applyDate": "2016-04-25",
        "birthDate": "1953-03-16",
        "phone": "081-499-2754",
        "lineId": "814992754",
        "facebook": "",
        "email": "Thasanee211@gmail.com",
        "address": "211 ซ.ลาดพร้าว 109 คลองจั่น บางกะปิ กรุงเทพฯ 10240",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-04",
        "notes": ""
    },
    {
        "id": "28001",
        "generation": 28,
        "name": "คุณเอก ศิละคุณาภรณ์",
        "nickname": "",
        "applyDate": "2019-04-30",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 28,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-10",
        "status": "deceased",
        "isDeceased": true,
        "notes": "ถึงแก่กรรม"
    },
    {
        "id": "01095",
        "generation": 1,
        "name": "คุณชัยวัฒน์ ศิริญาณ",
        "nickname": "มานีไทย",
        "applyDate": "2016-05-18",
        "birthDate": "",
        "phone": "415-205-4885",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "Sanfancisco Usa",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-11",
        "notes": ""
    },
    {
        "id": "01096",
        "generation": 1,
        "name": "คุณสุดารัตน์  อรรถวุฒินันท์",
        "nickname": "",
        "applyDate": "2016-05-18",
        "birthDate": "",
        "phone": "086-513-4352",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-11",
        "notes": ""
    },
    {
        "id": "01097",
        "generation": 2,
        "name": "คุณศิริวรรณ บาลนคร",
        "nickname": "",
        "applyDate": "2016-05-19",
        "birthDate": "",
        "phone": "083-718-1616",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-12",
        "notes": ""
    },
    {
        "id": "06006",
        "generation": 6,
        "name": "ทนายวิโรจน์ อัศวเสมาชัย",
        "nickname": "ง้วน",
        "applyDate": "2016-05-20",
        "birthDate": "1957-05-30",
        "phone": "081-860-7023",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "777/23 หมู่ 5 มบ.เรือนหลวงพาร์ควิลล์ ซ.มังกร-ขันดี แพรกษา เมือง สมุทรปราการ 10280",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-05-28",
        "notes": ""
    },
    {
        "id": "06007",
        "generation": 6,
        "name": "คุณรัศมี อัศวเสมาชัย",
        "nickname": "",
        "applyDate": "2016-05-20",
        "birthDate": "",
        "phone": "081-927-3021",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "Fr.Walailux Volkemer. Blücher str.74. Oberhausen Germany. 46045",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-05-26",
        "notes": ""
    },
    {
        "id": "01100",
        "generation": 1,
        "name": "คุณนิตยา เหล่าศิริลือชาไกล",
        "nickname": "",
        "applyDate": "2016-05-23",
        "birthDate": "",
        "phone": "081-580-7888",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-05-25",
        "notes": "สกุลเดิม/หมายเหตุ: /คงธนะ"
    },
    {
        "id": "04003",
        "generation": 4,
        "name": "คุณธีรรัตน์ ดิฏฐโชติ",
        "nickname": "",
        "applyDate": "2021-05-25",
        "birthDate": "",
        "phone": "086-4907799",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 4,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-05-25",
        "notes": ""
    },
    {
        "id": "01135",
        "generation": 1,
        "name": "คุณเนาวรัตน์ รัศมีสุขานนท์",
        "nickname": "",
        "applyDate": "2021-05-25",
        "birthDate": "",
        "phone": "093-965-2355",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "หาดใหญ่ สงขลา",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-21",
        "notes": ""
    },
    {
        "id": "01001",
        "generation": 1,
        "name": "คุณจินดารัตน์  ทัตอุปริตโถ",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "1954-03-20",
        "phone": "091-826-4294",
        "lineId": "jindarat_aia",
        "facebook": "",
        "email": "jindarat tatuparittho",
        "address": "36 ซ.เพชรเกษม 92 บางแคเหนือ บางแค กรุงเทพฯ 10160",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01004",
        "generation": 1,
        "name": "คุณชัยวัฒน์ ปิยะทัต",
        "nickname": "",
        "applyDate": "2021-06-28",
        "birthDate": "",
        "phone": "081-808-9087",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "113/132 ซ.3 ถ.การุญราษฎร์ เมือง สุราษฎร์ธานี 84000",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-01",
        "notes": ""
    },
    {
        "id": "01006",
        "generation": 1,
        "name": "คุณเชาวนี แพร่ภัทร",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-05",
        "notes": ""
    },
    {
        "id": "01008",
        "generation": 1,
        "name": "คุณมงคล หงษ์ยนต์",
        "nickname": "หมง",
        "applyDate": "2015-06-21",
        "birthDate": "1954-08-05",
        "phone": "063-328-2915",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "2100/72 ถ.จันทน์ ช่องนนทรี ยานนาวา กรุงเทพฯ 10120",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-26",
        "notes": ""
    },
    {
        "id": "01009",
        "generation": 1,
        "name": "คุณมาลี คี",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "089-188-0355",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "39,41 ถ.วัชรพล ท่าแร้ง บางเขน กทม 10230",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-04",
        "notes": ""
    },
    {
        "id": "01010",
        "generation": 1,
        "name": "คุณสมนึก เวณุภูติ",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "1952-06-14",
        "phone": "086-560-5252",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "68 ถ.ประชาราษฎร์สาย1 ซ.1 บางซื่อ กรุงเทพฯ 10800",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-15",
        "notes": ""
    },
    {
        "id": "01011",
        "generation": 1,
        "name": "คุณสุกัญญา จิรอลงกรณ์",
        "nickname": "หน่อย",
        "applyDate": "2015-06-21",
        "birthDate": "1953-05-10",
        "phone": "086-399-2090",
        "lineId": "0863992090",
        "facebook": "",
        "email": "Suanya Jiraalongkorn",
        "address": "56 มบ.วรางกูล ซ.1 ถ.รังสิต-นครนายก 64 ประชาธิปัตย์ ธัญบุรี ปทุมธานี 12130",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-17",
        "notes": ""
    },
    {
        "id": "01013",
        "generation": 1,
        "name": "คุณสุวรรณา ศิริเวชวราวุธ",
        "nickname": "อี้ด",
        "applyDate": "2015-06-21",
        "birthDate": "1953-10-31",
        "phone": "082-839-9911",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "762/117 มบ.The Palm ถ.พัฒนาการ 38 สวนหลวง สวนหลวง กรุงเทพฯ 10250",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-17",
        "notes": ""
    },
    {
        "id": "01014",
        "generation": 1,
        "name": "คุณโสภิต เจียรกุลประเสริฐ",
        "nickname": "ชิ้น",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "086-099-9917",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-05-14",
        "notes": ""
    },
    {
        "id": "01015",
        "generation": 1,
        "name": "คุณไอริน เจียมวิทยานุกูล",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "1954-04-19",
        "phone": "085-871-8490",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "67 ซ.รามคำแหง 21 พลับพลา วังทองหลาง กรุงเทพฯ 10310",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-08",
        "notes": ""
    },
    {
        "id": "01017",
        "generation": 1,
        "name": "คุณภาสินี บุญชยาอนันต์",
        "nickname": "แป้น",
        "applyDate": "2015-06-21",
        "birthDate": "1953-04-10",
        "phone": "089-049-1875",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "129/258 มบ.เพอร์เฟคเพลส บางรักน้อย เมือง นนทบุรี",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01018",
        "generation": 1,
        "name": "คุณนิภาพร พิมพ์พรรณชาติ",
        "nickname": "พร",
        "applyDate": "2015-06-21",
        "birthDate": "1954-11-14",
        "phone": "089-127-1417",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "126 ถ.ประโคนชัย ปากน้ำ เมือง สมุทรปราการ 10270",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01019",
        "generation": 1,
        "name": "คุณนงเยาว์ อินทรปรางค์",
        "nickname": "กุ้ง",
        "applyDate": "2015-06-21",
        "birthDate": "1953-04-14",
        "phone": "086-308-2294",
        "lineId": "0863082294",
        "facebook": "",
        "email": "Nongyao Nongyao",
        "address": "147 หมู่ 12 บ้านสุขา บ้านธาตุ เพ็ญ อุดรธานี",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01021",
        "generation": 1,
        "name": "คุณวินัย วิริยะกรอบชัย",
        "nickname": "ฮวก",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "089-763-0602",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": "สกุลเดิม/หมายเหตุ: /แซ่เจียม"
    },
    {
        "id": "01024",
        "generation": 1,
        "name": "คุณปรีชา ศิรประภาเดโช",
        "nickname": "",
        "applyDate": "2015-06-30",
        "birthDate": "1952-12-20",
        "phone": "084-465-4925",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "27 ถ.เจริญนคร 56 สำเหร่ ธนบุรี กรุงเทพฯ 10600",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01124",
        "generation": 1,
        "name": "คุณมนต์ศักดิ์ เชื่อมวงศ์",
        "nickname": "",
        "applyDate": "2020-06-24",
        "birthDate": "",
        "phone": "011-6267124064",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "USA USA",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-17",
        "notes": ""
    },
    {
        "id": "14010",
        "generation": 14,
        "name": "คุณธนพร สายสุวรรณ",
        "nickname": "",
        "applyDate": "2021-06-06",
        "birthDate": "",
        "phone": "086-398-6219",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-24",
        "notes": ""
    },
    {
        "id": "27001",
        "generation": 27,
        "name": "คุณดวิษ พงษ์ทองหล่อ",
        "nickname": "บอส",
        "applyDate": "2021-06-07",
        "birthDate": "1978-11-28",
        "phone": "090-965-5199",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1/1 ถ.บางนา-ตราด 19 แยก 22 บางนาเหนือ บางนา กรุงเทพฯ 10260",
        "education": {
            "gen": 27,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01027",
        "generation": 1,
        "name": "คุณธานินทร์ ก้องกฤษณะกุล",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "094-337-1069",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-04-07",
        "notes": ""
    },
    {
        "id": "01028",
        "generation": 1,
        "name": "คุณมนต์สฤษฎ์ วิริยะพงษ์",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-27",
        "notes": ""
    },
    {
        "id": "01030",
        "generation": 1,
        "name": "คุณนวลจันทร์ เอมแย้ม",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "081-892-5299",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-07-27",
        "notes": ""
    },
    {
        "id": "01037",
        "generation": 1,
        "name": "คุณอัครวัฒน์ ก้องเกียรติกานต์",
        "nickname": "",
        "applyDate": "2015-07-15",
        "birthDate": "",
        "phone": "063-639-9569",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-07",
        "notes": "สกุลเดิม/หมายเหตุ: /พรหมมาต"
    },
    {
        "id": "01038",
        "generation": 1,
        "name": "คุณรพีพัชร์ แสงโรจน์เพิ่มสุข",
        "nickname": "",
        "applyDate": "2015-07-17",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-08-24",
        "notes": ""
    },
    {
        "id": "01039",
        "generation": 1,
        "name": "คุณสุชาติ ทิพย์พิมล",
        "nickname": "ชาติ",
        "applyDate": "2015-07-17",
        "birthDate": "1953-06-30",
        "phone": "081-893-4602",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "113/132 ซ.3 ถ.การุณราษฎร์ เมือง สุราษฎร์ธานี",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-08-24",
        "notes": ""
    },
    {
        "id": "01040",
        "generation": 1,
        "name": "คุณเพ็ญศรี สอนคำ",
        "nickname": "",
        "applyDate": "2015-07-18",
        "birthDate": "",
        "phone": "089-482-1122",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-09-28",
        "notes": ""
    },
    {
        "id": "01041",
        "generation": 1,
        "name": "คุณสุมาลี ศักดิ์จิรพาพงษ์",
        "nickname": "อ๋อย",
        "applyDate": "2015-07-19",
        "birthDate": "1953-05-15",
        "phone": "080-925-3663",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "100/51 หมู่ 8 มบ.ชัยพฤกษ์ บางรักพัฒนา บางบัวทอง นนทบุรี",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-27",
        "notes": ""
    },
    {
        "id": "01043",
        "generation": 1,
        "name": "คุณชาลินี เหมะรักษ์",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "087-476-9101",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-26",
        "notes": ""
    },
    {
        "id": "01046",
        "generation": 1,
        "name": "คุณวไลวรรณ จิตต์สุวรรณ",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "081-880-4723",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-26",
        "notes": ""
    },
    {
        "id": "01047",
        "generation": 1,
        "name": "คุณจินตนา เร่มงคล",
        "nickname": "แอ๊ด",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "081-340-2493",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-26",
        "notes": ""
    },
    {
        "id": "01048",
        "generation": 1,
        "name": "คุณณิชภัทร  ชุ่มชูจันทร์",
        "nickname": "อ้อย ปากน้ำ",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "089-796-5359",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-26",
        "notes": ""
    },
    {
        "id": "01049",
        "generation": 1,
        "name": "คุณวิยะนา นาวานุกูล",
        "nickname": "เขียว ชุมพร",
        "applyDate": "2021-07-23",
        "birthDate": "",
        "phone": "081-907-8278",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-07-06",
        "notes": ""
    },
    {
        "id": "01050",
        "generation": 1,
        "name": "คุณรำไพ  คล้ายจินดา",
        "nickname": "โก๋ ปากน้ำ",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "081-938-5811",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-20",
        "notes": ""
    },
    {
        "id": "01051",
        "generation": 1,
        "name": "คุณเครือวัลย์  ไข่แก้ว",
        "nickname": "อ๊อด สระบุรี",
        "applyDate": "2021-07-23",
        "birthDate": "",
        "phone": "092-674-8338",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-26",
        "notes": ""
    },
    {
        "id": "01054",
        "generation": 1,
        "name": "คุณวิภาดา  รัตนราศี",
        "nickname": "ตา",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "080-061-0690",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "36 ร่มเกล้า ตะพานหิน ตะพานหิน พิจิตร 66110",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-27",
        "notes": ""
    },
    {
        "id": "01058",
        "generation": 1,
        "name": "คุณจิตราตรี ชรรินชัย",
        "nickname": "",
        "applyDate": "2015-07-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-07-17",
        "notes": ""
    },
    {
        "id": "01059",
        "generation": 1,
        "name": "คุณประภารัตน์ เกิดศิริ",
        "nickname": "",
        "applyDate": "2021-07-24",
        "birthDate": "",
        "phone": "081-795-3056",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-26",
        "notes": "สกุลเดิม/หมายเหตุ: /บัวหอม"
    },
    {
        "id": "01061",
        "generation": 1,
        "name": "คุณพจนา จันทร์แสงศรี",
        "nickname": "",
        "applyDate": "2015-07-28",
        "birthDate": "",
        "phone": "081-903-1943",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-03",
        "notes": ""
    },
    {
        "id": "01071",
        "generation": 1,
        "name": "คุณชนานันท์ เกตุผ่อง",
        "nickname": "หมู",
        "applyDate": "2021-07-02",
        "birthDate": "",
        "phone": "065-0525559",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-07-12",
        "notes": ""
    },
    {
        "id": "01103",
        "generation": 1,
        "name": "คุณภิญโญ น่วมเจิม",
        "nickname": "",
        "applyDate": "2016-07-12",
        "birthDate": "",
        "phone": "081-724-4601",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-07-27",
        "notes": ""
    },
    {
        "id": "01115",
        "generation": 1,
        "name": "คุณนิชาภา รุ่งแสงธราธร",
        "nickname": "",
        "applyDate": "2018-07-17",
        "birthDate": "",
        "phone": "096-392-9224",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-27",
        "notes": "สกุลเดิม/หมายเหตุ: สุพัตรา เทียมรัตน์"
    },
    {
        "id": "04002",
        "generation": 4,
        "name": "คุณสุพัฒน์ รุ่งเริงสุข",
        "nickname": "จุ๋ง",
        "applyDate": "2018-07-20",
        "birthDate": "1957-04-18",
        "phone": "081-826-2991",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "99/746 หมู่ 4 มบ.สีวลี-สุวรรณภูมิ บางพลีใหญ่ บางพลี สมุทรปราการ 10540",
        "education": {
            "gen": 4,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-10",
        "notes": ""
    },
    {
        "id": "01125",
        "generation": 1,
        "name": "คุณอัญชลี อัครพงศ์",
        "nickname": "กบ",
        "applyDate": "2020-07-03",
        "birthDate": "1954-02-02",
        "phone": "097-180-1019",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "42 ซ.พัฒนาการ 69 แยก 1 ประเวศ ประเวศ กรุงเทพฯ 10250",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-20",
        "notes": ""
    },
    {
        "id": "01126",
        "generation": 1,
        "name": "คุณศิริลักษณ์ สูตะบุตร",
        "nickname": "",
        "applyDate": "2020-07-26",
        "birthDate": "",
        "phone": "081-828-4451",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-18",
        "notes": ""
    },
    {
        "id": "01127",
        "generation": 1,
        "name": "คุณกฤติน  ศรีสุนทรไท",
        "nickname": "แอ๊ด",
        "applyDate": "2020-07-27",
        "birthDate": "1953-08-21",
        "phone": "081-566-1195",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "32/559 มบ.ประชาสุขซิตี้ ซ.27 ถ.ประชาอุทิศ 58/1 ทุ่งครุ ทุ่งครุ กรุงเทพฯ 10140",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-05",
        "notes": "สกุลเดิม/หมายเหตุ: วิชิต"
    },
    {
        "id": "01128",
        "generation": 1,
        "name": "คุณเกษณา เนตรวารี",
        "nickname": "",
        "applyDate": "2020-07-28",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-22",
        "notes": ""
    },
    {
        "id": "01129",
        "generation": 1,
        "name": "คุณศุภสิทธิ์ ธีระตระกูลชัย",
        "nickname": "",
        "applyDate": "2020-07-29",
        "birthDate": "",
        "phone": "081-805-5087",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "88/1 ซอย 1 หมู่บ้านมัณฑนา ปิ่นเกล้า พระราม 5 ถ.นครอินทร์ บางขุนกอง บางกรวย นนทบุรี 11130",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-11",
        "notes": ""
    },
    {
        "id": "09006",
        "generation": 9,
        "name": "คุณสมพร เทียนกระจ่าง",
        "nickname": "",
        "applyDate": "2020-07-29",
        "birthDate": "",
        "phone": "081-371-5509",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-24",
        "notes": ""
    },
    {
        "id": "01136",
        "generation": 1,
        "name": "คุณปิยะ รัตนวิมล",
        "nickname": "เปี๊ยก",
        "applyDate": "2021-07-02",
        "birthDate": "",
        "phone": "081-288-4940",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "141/1 ม.11 รอบเวียง(ศรีทรายมูล) เมือง เชียงราย 57000",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-07-02",
        "notes": ""
    },
    {
        "id": "01070",
        "generation": 1,
        "name": "คุณธนวรรณ ละอองแก้ว",
        "nickname": "มะ",
        "applyDate": "2015-08-16",
        "birthDate": "",
        "phone": "094-925-3332",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "43 หมู่ 5 หมู่บ้านเพชรงาม แพรกษา 1 ปากซอย 19 ถ.แพรกษา แพรกษาใหม่ เมือง สมุทรปราการ 10280",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-08-07",
        "notes": "สกุลเดิม/หมายเหตุ: คุณมยุรี ภูมิสุทธินันท์"
    },
    {
        "id": "01079",
        "generation": 1,
        "name": "คุณกิตติ ธนานุภาพไพศาล",
        "nickname": "ติ",
        "applyDate": "2021-08-28",
        "birthDate": "1953-02-23",
        "phone": "093-010-1611",
        "lineId": "",
        "facebook": "",
        "email": "kittipaisal23gmail.com",
        "address": "559/134 บ้านกลางเมืองรัชดา 36 ซ.เสือใหญ่อุทิศ จันทรเกษม จตุจักร กรุงเทพฯ 10900",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-05",
        "notes": ""
    },
    {
        "id": "07007",
        "generation": 7,
        "name": "คุณยุพิณ โชติเลอศักดิ์",
        "nickname": "",
        "applyDate": "2021-08-26",
        "birthDate": "",
        "phone": "094-925-5529",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "166/450 ถ.พหลโยธิน 52 คลองถนน สายไหม กทม 10250",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-08-26",
        "notes": ""
    },
    {
        "id": "13002",
        "generation": 13,
        "name": "คุณมณีรัตน์ อิ่มชื่น",
        "nickname": "",
        "applyDate": "2020-08-02",
        "birthDate": "",
        "phone": "086-010-8181",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-05",
        "notes": ""
    },
    {
        "id": "07017",
        "generation": 7,
        "name": "คุณลักษณา ลาภสมบุญกมล",
        "nickname": "เล็ก",
        "applyDate": "2021-08-18",
        "birthDate": "1957-10-03",
        "phone": "086-568-2634",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "26 มบ.สวนหลวงนิเวศน์ ถ.เฉลิมพระเกียรติ ร.9 ซ.34 หนองบอน ประเวศ กรุงเทพฯ 10250",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-24",
        "notes": ""
    },
    {
        "id": "09009",
        "generation": 9,
        "name": "คุณวาณี ภัทราวุธสมบูรณ์",
        "nickname": "",
        "applyDate": "2021-08-27",
        "birthDate": "",
        "phone": "081-552-5125",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-19",
        "notes": ""
    },
    {
        "id": "01116",
        "generation": 1,
        "name": "คุณสุกัลยา ไชยแก้ว",
        "nickname": "",
        "applyDate": "2018-08-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-31",
        "notes": ""
    },
    {
        "id": "01117",
        "generation": 1,
        "name": "คุณวิทยา ตุลยนิติกุล",
        "nickname": "",
        "applyDate": "2018-08-14",
        "birthDate": "",
        "phone": "081-807-9417",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1692/122 หมู่บ้านคุ้มทองวิลล่า เทพารักษ์ เมือง สมุทรปราการ 10270",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-05",
        "notes": ""
    },
    {
        "id": "01137",
        "generation": 1,
        "name": "คุณอนุวัฒน์ ภัทรกรกุล",
        "nickname": "",
        "applyDate": "2021-08-24",
        "birthDate": "",
        "phone": "083-540-4554",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-08-24",
        "notes": ""
    },
    {
        "id": "09003",
        "generation": 20,
        "name": "คุณนฤปนาท เกษร",
        "nickname": "",
        "applyDate": "2021-08-27",
        "birthDate": "",
        "phone": "062-452-6165",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 20,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-20",
        "notes": ""
    },
    {
        "id": "09007",
        "generation": 9,
        "name": "คุณนิตยา สรรไพโรจน์",
        "nickname": "",
        "applyDate": "2021-08-27",
        "birthDate": "",
        "phone": "082-076-2999",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-08-12",
        "notes": ""
    },
    {
        "id": "09008",
        "generation": 9,
        "name": "คุณอุทุมพร ชยสิทธิโสภณ",
        "nickname": "",
        "applyDate": "2021-08-27",
        "birthDate": "",
        "phone": "081-654-0345",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-08-17",
        "notes": "สกุลเดิม/หมายเหตุ: ณัฐพร ชยสิทธิโสภณ"
    },
    {
        "id": "09010",
        "generation": 9,
        "name": "คุณยุวดี  สุขมาก",
        "nickname": "",
        "applyDate": "2021-08-27",
        "birthDate": "",
        "phone": "098-369-1926",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-08-27",
        "notes": ""
    },
    {
        "id": "01060",
        "generation": 1,
        "name": "คุณจิราพรรณ พวงมาลี",
        "nickname": "",
        "applyDate": "2015-07-28",
        "birthDate": "",
        "phone": "081-408-0635",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-10",
        "notes": ""
    },
    {
        "id": "13001",
        "generation": 13,
        "name": "คุณธนะสิทธิ์ ศิวะยิ่งสุวรรณ",
        "nickname": "ตี๋",
        "applyDate": "2021-09-15",
        "birthDate": "",
        "phone": "089-895-3821",
        "lineId": "21052507",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-02",
        "notes": ""
    },
    {
        "id": "07003",
        "generation": 7,
        "name": "คุณอัจฉรา รงคะอำพันธุ์",
        "nickname": "อัช",
        "applyDate": "2021-09-30",
        "birthDate": "1964-05-21",
        "phone": "086-478-8184",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "96/3 มบ.โกลเด้นทาวน์ รามอินทรา-วงแหวนกาญจนาภิเษก",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-30",
        "notes": ""
    },
    {
        "id": "02014",
        "generation": 2,
        "name": "คุณปิยะนาถ หวังภักดี",
        "nickname": "",
        "applyDate": "2021-09-28",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-28",
        "notes": ""
    },
    {
        "id": "10001",
        "generation": 10,
        "name": "คุณพิริยา นิมิตรนิวัฒน์",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "085-403-3355",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 10,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-05-05",
        "notes": ""
    },
    {
        "id": "13005",
        "generation": 13,
        "name": "คุณบุญเลิศ นึกกรัมย์",
        "nickname": "",
        "applyDate": "2021-09-11",
        "birthDate": "",
        "phone": "086-006-7174",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-11",
        "notes": ""
    },
    {
        "id": "01104",
        "generation": 1,
        "name": "คุณยุทธนา เพชรโชติ",
        "nickname": "กุ้ง",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "081-6160393",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-10",
        "notes": ""
    },
    {
        "id": "01105",
        "generation": 1,
        "name": "คุณทนง สมบัติพานิช",
        "nickname": "",
        "applyDate": "2016-09-13",
        "birthDate": "",
        "phone": "084-918-6693",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-09-09",
        "notes": ""
    },
    {
        "id": "01106",
        "generation": 1,
        "name": "คุณรัชนีวรรณ นิ่มโวหาร",
        "nickname": "",
        "applyDate": "2021-09-05",
        "birthDate": "",
        "phone": "081-8380694",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-05",
        "notes": "สกุลเดิม/หมายเหตุ: /ชื่นประทุม"
    },
    {
        "id": "16004",
        "generation": 16,
        "name": "คุณณัชชา  กล่อมจิตร์",
        "nickname": "",
        "applyDate": "2021-09-12",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 16,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-12",
        "notes": ""
    },
    {
        "id": "01118",
        "generation": 1,
        "name": "คุณอรพินทร์ โรจนแพทย์",
        "nickname": "",
        "applyDate": "2018-09-01",
        "birthDate": "",
        "phone": "081-913-0175",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "89/117 หมู่บ้านลานมณี ซ.สายไหม 55 สายไหม สายไหม กทม 10220",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-09-04",
        "notes": ""
    },
    {
        "id": "01119",
        "generation": 1,
        "name": "คุณภาณุ เอื้อวิทยา",
        "nickname": "",
        "applyDate": "2018-09-13",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-15",
        "notes": ""
    },
    {
        "id": "01120",
        "generation": 1,
        "name": "คุณวิรัตน์ หวังศิริสมบัติ",
        "nickname": "",
        "applyDate": "2018-09-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "91/65 ม. 3 บ้านสวน เมือง ชลบุรี 2000",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-09-26",
        "notes": ""
    },
    {
        "id": "01131",
        "generation": 1,
        "name": "คุณมาลินี กัณวเศรษฐ",
        "nickname": "",
        "applyDate": "2020-09-08",
        "birthDate": "",
        "phone": "089-682-4837",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-10-07",
        "notes": ""
    },
    {
        "id": "01082",
        "generation": 1,
        "name": "คุณทองใบ จัตุลี้",
        "nickname": "",
        "applyDate": "2015-10-10",
        "birthDate": "",
        "phone": "081-946-4182",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-06",
        "notes": ""
    },
    {
        "id": "19002",
        "generation": 19,
        "name": "คุณฐานิสร์พงศ์ ศุภธนานันท์",
        "nickname": "เจสัน",
        "applyDate": "2016-10-28",
        "birthDate": "",
        "phone": "089-894-7547",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-13",
        "notes": ""
    },
    {
        "id": "09005",
        "generation": 9,
        "name": "คุณพรศิริ เติมเกียรติสุข",
        "nickname": "",
        "applyDate": "2019-10-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-27",
        "notes": ""
    },
    {
        "id": "01132",
        "generation": 1,
        "name": "ดร. คมสัน เหล่าศิลปเจริญ",
        "nickname": "",
        "applyDate": "2020-10-02",
        "birthDate": "",
        "phone": "089-442-2224",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2020-10-02",
        "notes": ""
    },
    {
        "id": "01133",
        "generation": 1,
        "name": "คุณธิดา ทองฉ่ำ",
        "nickname": "",
        "applyDate": "2020-10-30",
        "birthDate": "",
        "phone": "089-790-0536",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-05",
        "notes": ""
    },
    {
        "id": "14006",
        "generation": 14,
        "name": "คุณสัญญา หอมพันธุ๋",
        "nickname": "",
        "applyDate": "2018-12-02",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-11-01",
        "notes": ""
    },
    {
        "id": "07018",
        "generation": 7,
        "name": "คุณโกมล ศรีบางพลีน้อย",
        "nickname": "",
        "applyDate": "2018-12-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-01-11",
        "notes": ""
    },
    {
        "id": "09010",
        "generation": 9,
        "name": "คุณสุพัตรา ลิ้มตระกูล",
        "nickname": "",
        "applyDate": "2021-09-06",
        "birthDate": "",
        "phone": "089-812-4726",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-09-03",
        "notes": ""
    },
    {
        "id": "11002",
        "generation": 11,
        "name": "คุณสุชาดา ศักยะบุตร",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "081-599-5401",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 11,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-08",
        "notes": ""
    },
    {
        "id": "28002",
        "generation": 28,
        "name": "คุณกิตติยา อนันตโชติหิรัญ",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "085-076-6491",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 28,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-02",
        "notes": ""
    },
    {
        "id": "09011",
        "generation": 9,
        "name": "คุณสุมาลี โรจนวานิช",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "086-366-6871",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-22",
        "notes": ""
    },
    {
        "id": "19003",
        "generation": 19,
        "name": "คุณชวลิต ไพรสกุลเดชา",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "089-022-1467",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-09-27",
        "notes": ""
    },
    {
        "id": "38001",
        "generation": 38,
        "name": "คุณสุรพงศ์ ญาณสิทธิผล",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "095-792-4920",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 38,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-08",
        "notes": ""
    },
    {
        "id": "34001",
        "generation": 34,
        "name": "คุณพัชราภรณ์ ไพรพิบูลยกิจ",
        "nickname": "",
        "applyDate": "2021-09-08",
        "birthDate": "",
        "phone": "098-446-9785",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 34,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-08",
        "notes": ""
    },
    {
        "id": "35001",
        "generation": 35,
        "name": "คุณฉัตรชัย เพียงอภิชาติ",
        "nickname": "",
        "applyDate": "2021-09-09",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 35,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-05-07",
        "notes": ""
    },
    {
        "id": "23001",
        "generation": 23,
        "name": "คุณฉวีวรรณ มณีแสง",
        "nickname": "",
        "applyDate": "2021-09-09",
        "birthDate": "",
        "phone": "092-939-9166",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 23,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-29",
        "notes": ""
    },
    {
        "id": "34002",
        "generation": 34,
        "name": "คุณอาทิตย์ เศรษฐพงศ์",
        "nickname": "",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "095-447-8991",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 34,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-10",
        "notes": ""
    },
    {
        "id": "32001",
        "generation": 32,
        "name": "คุณณารัณวรี โฆษะวีรวัฒน์",
        "nickname": "",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "063-624-5959",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 32,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-30",
        "notes": ""
    },
    {
        "id": "04004",
        "generation": 4,
        "name": "คุณสำพันธ์ วันดี",
        "nickname": "",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "063-664-9516",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 4,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-10",
        "notes": ""
    },
    {
        "id": "09012",
        "generation": 9,
        "name": "คุณกุลจิรา ปรีชานนท์",
        "nickname": "ตุ้ม",
        "applyDate": "2021-09-10",
        "birthDate": "1961-10-08",
        "phone": "085-886-6212",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "548/20 ม.ชวนชื่นปาร์ค อ่อนนุช-วงแหวน ถ.กาญจนาภิเษก ประเวศ ประเวศ กรุงเทพฯ 10250",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-31",
        "notes": ""
    },
    {
        "id": "06009",
        "generation": 6,
        "name": "คุณศิริอร โชติสถิตย์ชัย",
        "nickname": "หน่อย",
        "applyDate": "2021-09-10",
        "birthDate": "1957-09-04",
        "phone": "089-699-9996",
        "lineId": "089-699-9996",
        "facebook": "",
        "email": "หน่อยทรัพย์บุญชัย",
        "address": "100/1098 หมู่ 10 บางเมือง เมือง สมุทรปราการ 10270",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-17",
        "notes": ""
    },
    {
        "id": "28003",
        "generation": 28,
        "name": "คุณจารุณี อาจมุณี",
        "nickname": "",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "086-355-4983",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 28,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-25",
        "notes": ""
    },
    {
        "id": "13013",
        "generation": 13,
        "name": "คุณทรงกลด มั่นสิงห์",
        "nickname": "",
        "applyDate": "2021-09-12",
        "birthDate": "",
        "phone": "098-280-0422",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-08-14",
        "notes": ""
    },
    {
        "id": "15001",
        "generation": 15,
        "name": "คุณสุณีพร ทองสุก",
        "nickname": "",
        "applyDate": "2021-09-12",
        "birthDate": "",
        "phone": "089-183-5645",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 15,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-12",
        "notes": ""
    },
    {
        "id": "14011",
        "generation": 14,
        "name": "คุณณัฐชญา เอี่ยมอิ่ม",
        "nickname": "",
        "applyDate": "2021-09-12",
        "birthDate": "",
        "phone": "062-819-6535",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-12",
        "notes": ""
    },
    {
        "id": "01138",
        "generation": 1,
        "name": "คุณสรรพชัย มงคลสุขไพบูลย์",
        "nickname": "",
        "applyDate": "2021-09-13",
        "birthDate": "",
        "phone": "081-923-4857",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-13",
        "notes": ""
    },
    {
        "id": "01139",
        "generation": 1,
        "name": "คุณสมพร อาภาสิริกุล",
        "nickname": "",
        "applyDate": "2021-09-13",
        "birthDate": "",
        "phone": "098-585-9159",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-13",
        "notes": ""
    },
    {
        "id": "06010",
        "generation": 6,
        "name": "คุณชมเดือน คุ้มอนุวงศ์",
        "nickname": "",
        "applyDate": "2021-09-15",
        "birthDate": "",
        "phone": "02-337-4824",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-09-07",
        "notes": ""
    },
    {
        "id": "09018",
        "generation": 9,
        "name": "คุณอารียา ใจอารีย์",
        "nickname": "",
        "applyDate": "2021-09-15",
        "birthDate": "",
        "phone": "081-908-0313",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-20",
        "notes": ""
    },
    {
        "id": "01140",
        "generation": 1,
        "name": "คุณสุหญิง พันธุ์พิพัฒน์",
        "nickname": "",
        "applyDate": "2021-09-15",
        "birthDate": "",
        "phone": "089-870-1001",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-15",
        "notes": ""
    },
    {
        "id": "05007",
        "generation": 5,
        "name": "คุณมลมล ตั้งพงษ์",
        "nickname": "",
        "applyDate": "2021-09-16",
        "birthDate": "",
        "phone": "081-449-3348",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-16",
        "notes": ""
    },
    {
        "id": "23002",
        "generation": 23,
        "name": "คุณยุทาอร เจียรนัย",
        "nickname": "",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "089-455-5446",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 23,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-10",
        "notes": ""
    },
    {
        "id": "29001",
        "generation": 29,
        "name": "คุณณฏฐ์มน สิทธิเจริญธรรม",
        "nickname": "",
        "applyDate": "2021-09-10",
        "birthDate": "",
        "phone": "061-263-5919",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 29,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-11",
        "notes": ""
    },
    {
        "id": "02017",
        "generation": 2,
        "name": "คุณสันติ ศรีอินทร์",
        "nickname": "",
        "applyDate": "2021-09-21",
        "birthDate": "",
        "phone": "094-489-6882",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-21",
        "notes": ""
    },
    {
        "id": "24001",
        "generation": 24,
        "name": "คุณขจรศักดิ์ ประดิษฐาน",
        "nickname": "",
        "applyDate": "2021-09-22",
        "birthDate": "",
        "phone": "086-306-4445",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 24,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-22",
        "notes": ""
    },
    {
        "id": "02018",
        "generation": 2,
        "name": "คุณสุมลรัตน์ หิรัญพัทรวงศ์",
        "nickname": "",
        "applyDate": "2021-09-29",
        "birthDate": "",
        "phone": "085-901-5222",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-29",
        "notes": ""
    },
    {
        "id": "07019",
        "generation": 7,
        "name": "คุณวลัยลักษณ์ โฟร์เคเมอร์",
        "nickname": "",
        "applyDate": "2021-09-29",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-29",
        "notes": ""
    },
    {
        "id": "01141",
        "generation": 1,
        "name": "คุณจารุนันท์ โรทิตเสถียร",
        "nickname": "",
        "applyDate": "2021-09-30",
        "birthDate": "",
        "phone": "081-903-7854",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-09-30",
        "notes": ""
    },
    {
        "id": "17001",
        "generation": 17,
        "name": "คุณปนัดดา สิริวุฒิ",
        "nickname": "",
        "applyDate": "2021-10-13",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-10-13",
        "notes": ""
    },
    {
        "id": "18004",
        "generation": 18,
        "name": "คุณอัมพร กุ่มเรือง",
        "nickname": "",
        "applyDate": "2021-11-03",
        "birthDate": "",
        "phone": "093-656-6060",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-11-03",
        "notes": ""
    },
    {
        "id": "03012",
        "generation": 3,
        "name": "คุณสุวิทย์ สวมสูง",
        "nickname": "",
        "applyDate": "2021-11-06",
        "birthDate": "",
        "phone": "081-612-3448",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "14005",
        "generation": 14,
        "name": "คุณพรศรีทรัพย์ พัชระธะนะสุวรรณ",
        "nickname": "ปู",
        "applyDate": "2017-10-17",
        "birthDate": "1968-05-21",
        "phone": "095-949-7956",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "14 ซ.อ่อนนุช 27 อ่อนนุช สวนหลวง กรุงเทพฯ 10250",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-02",
        "notes": ""
    },
    {
        "id": "10002",
        "generation": 10,
        "name": "คุณรจนา บุญชู",
        "nickname": "",
        "applyDate": "2023-10-04",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 10,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-29",
        "notes": "สกุลเดิม/หมายเหตุ: จันทร์เด่น"
    },
    {
        "id": "01143",
        "generation": 1,
        "name": "คุณเสน่ห์ หลสุวรรณ",
        "nickname": "น้อย",
        "applyDate": "2023-10-08",
        "birthDate": "1951-06-03",
        "phone": "084-093-1461",
        "lineId": "",
        "facebook": "",
        "email": "เสน่ห์ หลสุวรรณ",
        "address": "9/13 ซ.อ่อนนุช 74/4 ถ.อ่อนนุช ประเวศ ประเวศ กรุงเทพฯ 10250",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-02-03",
        "notes": ""
    },
    {
        "id": "06011",
        "generation": 6,
        "name": "คุณสุชาติ สุขวัต",
        "nickname": "",
        "applyDate": "2021-11-10",
        "birthDate": "",
        "phone": "094-727-3303",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-11-10",
        "notes": ""
    },
    {
        "id": "19004",
        "generation": 19,
        "name": "คุณเมทินี สุขคำ",
        "nickname": "",
        "applyDate": "2021-11-11",
        "birthDate": "",
        "phone": "095-504-6408",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-16",
        "notes": ""
    },
    {
        "id": "05007",
        "generation": 5,
        "name": "คุณจุฑามาศ เจริญพานิช",
        "nickname": "",
        "applyDate": "2021-11-11",
        "birthDate": "",
        "phone": "094-485-3648",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-18",
        "notes": "สกุลเดิม/หมายเหตุ: เกษแก้ว"
    },
    {
        "id": "09014",
        "generation": 9,
        "name": "คุณอนนต์ มีบุญรอด",
        "nickname": "",
        "applyDate": "2021-11-11",
        "birthDate": "",
        "phone": "061-269-8799",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-11-11",
        "notes": ""
    },
    {
        "id": "06013",
        "generation": 6,
        "name": "คุณพรชนก ระนาท",
        "nickname": "",
        "applyDate": "2022-11-30",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-11",
        "notes": ""
    },
    {
        "id": "06014",
        "generation": 6,
        "name": "คุณเฉลิมพล ปองจิตเลิศขจร",
        "nickname": "ชาลี",
        "applyDate": "2022-11-30",
        "birthDate": "1958-09-18",
        "phone": "081-564-3196",
        "lineId": "ch 115888",
        "facebook": "",
        "email": "",
        "address": "9/8 มบ.เดอสยาม ซ.เฉลิมพระเกียรติ ร.9 ซ.38 ดอกไม้ ประเวศ กรุงเทพฯ 10250",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-06",
        "notes": ""
    },
    {
        "id": "01142",
        "generation": 1,
        "name": "คุณสุมนา วงษ์ปราณี",
        "nickname": "",
        "applyDate": "2021-12-08",
        "birthDate": "",
        "phone": "089-926-5400",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-12-08",
        "notes": ""
    },
    {
        "id": "09017",
        "generation": 9,
        "name": "คุณศิริกาญจน์ ขจรรุ่งเรืองชัย",
        "nickname": "",
        "applyDate": "2022-06-12",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-09",
        "notes": ""
    },
    {
        "id": "18005",
        "generation": 18,
        "name": "คุณอัญญ์วริษฐ์ ศิริยงค์",
        "nickname": "",
        "applyDate": "2022-06-12",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-12",
        "notes": ""
    },
    {
        "id": "06012",
        "generation": 6,
        "name": "คุณรุ่งนภา บุญยะนันท์",
        "nickname": "รุ่ง",
        "applyDate": "2022-06-12",
        "birthDate": "1959-06-19",
        "phone": "081-376-2733",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "567 ซ.57 ถ.สุขุมวิท 101/1 บางจาก พระโขนง กรุงเทพฯ 10260",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-09",
        "notes": ""
    },
    {
        "id": "18006",
        "generation": 18,
        "name": "คุณอรวรรณ พุ่มผาสุข",
        "nickname": "แอน",
        "applyDate": "2022-06-12",
        "birthDate": "1972-02-10",
        "phone": "089-890-4455",
        "lineId": "annphumphasuk",
        "facebook": "",
        "email": "ANN ORAWAN PHUMPHASUK",
        "address": "35/2 ซ.เชษฐา ถ.สรรพาวุธ บางนาเหนือ บางนา กรุงเทพฯ 10260",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "19005",
        "generation": 19,
        "name": "คุณวัลลภา  คล่องแคล่ว",
        "nickname": "",
        "applyDate": "2022-06-12",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-08",
        "notes": ""
    },
    {
        "id": "19006",
        "generation": 19,
        "name": "คุณดิสพงษ์ วิชา",
        "nickname": "",
        "applyDate": "2022-06-12",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "18007",
        "generation": 18,
        "name": "คุณรุ่งรัตน์ เพชรพงศ์",
        "nickname": "",
        "applyDate": "2022-06-12",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-12",
        "notes": ""
    },
    {
        "id": "18008",
        "generation": 18,
        "name": "คุณปราณี ปั้นอุ่น",
        "nickname": "จี๋",
        "applyDate": "2022-06-13",
        "birthDate": "1972-01-20",
        "phone": "084-433-4843",
        "lineId": "treeinlove",
        "facebook": "",
        "email": "Pranee P. Jakajee",
        "address": "4/78 ถ.คลองสิบ-คลองสิบสี่ คลองสิบสอง หนองจอก กรุงเทพฯ",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-06",
        "notes": ""
    },
    {
        "id": "14012",
        "generation": 14,
        "name": "คุณสมบูรณ์ ประชุมพรชัย",
        "nickname": "",
        "applyDate": "2022-06-14",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-14",
        "notes": ""
    },
    {
        "id": "14013",
        "generation": 14,
        "name": "คุณโสภิดา เอี่ยมประเสริฐ",
        "nickname": "",
        "applyDate": "2022-06-14",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-18",
        "notes": ""
    },
    {
        "id": "18009",
        "generation": 18,
        "name": "คุณนุสรา ทองศถุงคลี",
        "nickname": "",
        "applyDate": "2022-06-14",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-10",
        "notes": ""
    },
    {
        "id": "19007",
        "generation": 19,
        "name": "คุณอัญชลี รุ่งเรือง",
        "nickname": "ตุ๊ก",
        "applyDate": "2022-06-14",
        "birthDate": "1972-08-13",
        "phone": "081-255-8440",
        "lineId": "0812558440",
        "facebook": "",
        "email": "อัญชลี รุ่งเรือง",
        "address": "55 ซ.อุดมสุข 18 ถ.สุขุมวิท 103 บางนาเหนือ บางนา กรุงเทพฯ 10260",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-09",
        "notes": ""
    },
    {
        "id": "18010",
        "generation": 18,
        "name": "คุณณิชชา พลอยทับทิม",
        "nickname": "",
        "applyDate": "2022-06-14",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-18",
        "notes": ""
    },
    {
        "id": "18011",
        "generation": 18,
        "name": "คุณศศิลักษณ์ พจนานนท์",
        "nickname": "",
        "applyDate": "2022-06-13",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-15",
        "notes": ""
    },
    {
        "id": "19008",
        "generation": 19,
        "name": "คุณนิภารัตน์ วิลาสพิทยาเลิศ",
        "nickname": "",
        "applyDate": "2022-06-15",
        "birthDate": "1972-08-25",
        "phone": "085-076-0293",
        "lineId": "pum_npi0280",
        "facebook": "",
        "email": "",
        "address": "15/189 มบ.เซ็นโทร พระราม 2-พุทธบูชา บางขุนเทียน ท่าข้าม กรุงเทพฯ",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-09",
        "notes": ""
    },
    {
        "id": "19009",
        "generation": 19,
        "name": "คุณอรทัย ชวดบัว",
        "nickname": "",
        "applyDate": "2022-06-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-15",
        "notes": ""
    },
    {
        "id": "19010",
        "generation": 19,
        "name": "คุณวัณรัตน์ กรุดสอน",
        "nickname": "",
        "applyDate": "2022-06-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-15",
        "notes": ""
    },
    {
        "id": "42001",
        "generation": 3,
        "name": "คุณน้ำผึ้ง เพียวอยู่",
        "nickname": "",
        "applyDate": "2022-06-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-19",
        "notes": ""
    },
    {
        "id": "ส.17001",
        "generation": 17,
        "name": "คุณดุสิต แสงสว่าง",
        "nickname": "",
        "applyDate": "2022-06-15",
        "birthDate": "",
        "phone": "081-622-6144",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-15",
        "notes": ""
    },
    {
        "id": "18012",
        "generation": 18,
        "name": "คุณพิพัฒน์ โพธิ์ศรี",
        "nickname": "เอ",
        "applyDate": "2022-06-16",
        "birthDate": "1972-03-04",
        "phone": "093-017-6178",
        "lineId": "PIPAT-A",
        "facebook": "",
        "email": "พิพัฒน์ โพธิ์ศรี",
        "address": "11/2 หมู่ 13 บางกอบัว พระประแดง สมุทรปราการ 10130",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-17",
        "notes": ""
    },
    {
        "id": "18013",
        "generation": 18,
        "name": "คุณภัททราวดี ฟ้อนงามดี",
        "nickname": "",
        "applyDate": "2022-06-16",
        "birthDate": "",
        "phone": "084-524-1678",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-07-03",
        "notes": ""
    },
    {
        "id": "07009",
        "generation": 7,
        "name": "คุณณัฏฐ์ธนัน โสภณวุฒิไกร",
        "nickname": "",
        "applyDate": "2022-06-17",
        "birthDate": "",
        "phone": "085-459-5195",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-11-25",
        "notes": ""
    },
    {
        "id": "ส.17002",
        "generation": 17,
        "name": "คุณกิตติศักดิ์ มัธยมจันทร์",
        "nickname": "กลาง",
        "applyDate": "2022-06-18",
        "birthDate": "",
        "phone": "098-830-7063",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-05",
        "notes": ""
    },
    {
        "id": "ส.17003",
        "generation": 17,
        "name": "คุณจันทิมา สุทธานี",
        "nickname": "อ้อ",
        "applyDate": "2022-06-18",
        "birthDate": "",
        "phone": "094-556-9291",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-05",
        "notes": ""
    },
    {
        "id": "ส.17004",
        "generation": 17,
        "name": "คุณนงลักษณ์ ม่วงแดง",
        "nickname": "ปู",
        "applyDate": "2022-06-18",
        "birthDate": "",
        "phone": "081-084-9927",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-18",
        "notes": "สกุลเดิม/หมายเหตุ: สกุลเดิม คำนวณ"
    },
    {
        "id": "ส.17005",
        "generation": 17,
        "name": "คุณอารีย์ มิ่งศิริวัฒนกุล",
        "nickname": "รีย์",
        "applyDate": "2022-06-18",
        "birthDate": "",
        "phone": "089-666-3487",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2023-06-14",
        "notes": "สกุลเดิม/หมายเหตุ: สกุลเดิม บูรณะกนก"
    },
    {
        "id": "ส.17006",
        "generation": 17,
        "name": "คุณวิภูวรรธน์ สิทธิโชควงศ์",
        "nickname": "เอ",
        "applyDate": "2022-06-18",
        "birthDate": "",
        "phone": "082-444-7456",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-08",
        "notes": ""
    },
    {
        "id": "ส.17007",
        "generation": 17,
        "name": "คุณพัชรี ไม่น้อยทรัพย์",
        "nickname": "บิ๊ก",
        "applyDate": "2022-06-18",
        "birthDate": "",
        "phone": "084-138-2676",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-05",
        "notes": ""
    },
    {
        "id": "19011",
        "generation": 19,
        "name": "คุณอุทัยวรรณ  ศุภธนานันท์",
        "nickname": "แตงไทย",
        "applyDate": "2022-06-21",
        "birthDate": "1973-04-13",
        "phone": "093-098-8884",
        "lineId": "0930988884",
        "facebook": "",
        "email": "Uthaiwan Su",
        "address": "123/688 ม.3 บางปลา บางพลี สมุทรปราการ 10540",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-08",
        "notes": ""
    },
    {
        "id": "ส.18001",
        "generation": 18,
        "name": "คุณณัฐวีณ์  อินทสุวรรณ์",
        "nickname": "",
        "applyDate": "2022-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "19012",
        "generation": 19,
        "name": "คุณรสสุคนธ์ หน่อเนื้อ",
        "nickname": "",
        "applyDate": "2022-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "19013",
        "generation": 19,
        "name": "คุณวรัทยา โชติรินทร์",
        "nickname": "",
        "applyDate": "2022-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "19014",
        "generation": 19,
        "name": "คุณอภิษดา  บัค",
        "nickname": "",
        "applyDate": "2022-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-10",
        "notes": ""
    },
    {
        "id": "18014",
        "generation": 18,
        "name": "คุณวรรณภา รัตนจีนะ",
        "nickname": "กุ้ง",
        "applyDate": "2022-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-04",
        "notes": ""
    },
    {
        "id": "19015",
        "generation": 19,
        "name": "คุณนวรัตน์ แสงวัฒน์",
        "nickname": "",
        "applyDate": "2022-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-03-04",
        "notes": ""
    },
    {
        "id": "19016",
        "generation": 19,
        "name": "คุณทิพย์ชนก นิลบัวคลี่",
        "nickname": "",
        "applyDate": "2022-06-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-05",
        "notes": ""
    },
    {
        "id": "19017",
        "generation": 19,
        "name": "คุณนิภาภัทร โพธิพุธ",
        "nickname": "",
        "applyDate": "2022-06-23",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-20",
        "notes": ""
    },
    {
        "id": "19018",
        "generation": 19,
        "name": "คุณจันทนา ภิญญภาพ",
        "nickname": "",
        "applyDate": "2022-06-23",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-13",
        "notes": ""
    },
    {
        "id": "36001",
        "generation": 36,
        "name": "คุณเสาวลักษณ์ นิดหนู",
        "nickname": "เมย์",
        "applyDate": "2022-06-23",
        "birthDate": "",
        "phone": "091-827-5516",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 36,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-23",
        "notes": ""
    },
    {
        "id": "ส.170008",
        "generation": 17,
        "name": "คุณเสรี โสมานันท์",
        "nickname": "เป้-เป้ง",
        "applyDate": "2022-06-23",
        "birthDate": "",
        "phone": "086-372-4230",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-23",
        "notes": ""
    },
    {
        "id": "19019",
        "generation": 19,
        "name": "คุณอรสุมา อาห์หมัด",
        "nickname": "",
        "applyDate": "2022-06-23",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-20",
        "notes": ""
    },
    {
        "id": "23003",
        "generation": 23,
        "name": "คุณไชยพร หน่อเนื้อ",
        "nickname": "",
        "applyDate": "2022-06-24",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 23,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "19020",
        "generation": 19,
        "name": "คุณจินตนา หิรัญรัตนพงศ์",
        "nickname": "",
        "applyDate": "2022-06-24",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-12",
        "notes": ""
    },
    {
        "id": "ส.18002",
        "generation": 18,
        "name": "คุณสลักฤทัย สุคนธ์ภัทร",
        "nickname": "",
        "applyDate": "2022-06-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-06-26",
        "notes": ""
    },
    {
        "id": "19022",
        "generation": 19,
        "name": "คุณสุกัญญา มณีกิจ",
        "nickname": "แจ๊ว",
        "applyDate": "2023-06-16",
        "birthDate": "1972-08-11",
        "phone": "095-954-2916",
        "lineId": "jaewsukanya",
        "facebook": "",
        "email": "Sukanya Maneekit",
        "address": "41/39 ซ.59 ถ.พระราม 3 ช่องนนทรี ยานนาวา กรุงเทพฯ 10120",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "19021",
        "generation": 19,
        "name": "คุณปทิตตา พินิจพรประภา",
        "nickname": "",
        "applyDate": "2022-07-02",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-07-02",
        "notes": ""
    },
    {
        "id": "36002",
        "generation": 36,
        "name": "คุณสุชาติ สอนแสง",
        "nickname": "",
        "applyDate": "2022-07-09",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 36,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-08-11",
        "notes": ""
    },
    {
        "id": "03011",
        "generation": 3,
        "name": "คุณประมุก หุ่นสุวรรณ",
        "nickname": "",
        "applyDate": "2022-03-21",
        "birthDate": "",
        "phone": "089-936-2124",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-03-21",
        "notes": ""
    },
    {
        "id": "14014",
        "generation": 14,
        "name": "คุณนันท์ประภา  กวินฤทัยปรีดา",
        "nickname": "",
        "applyDate": "2022-05-27",
        "birthDate": "",
        "phone": "080-442-6269",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-05-27",
        "notes": ""
    },
    {
        "id": "24002",
        "generation": 24,
        "name": "คุณภาวินี แย้มยิ้ม",
        "nickname": "",
        "applyDate": "2022-08-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 24,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-13",
        "notes": "สกุลเดิม/หมายเหตุ: เดือนหญิง"
    },
    {
        "id": "16005",
        "generation": 16,
        "name": "คุณจตุรพร ชูเดช",
        "nickname": "",
        "applyDate": "2022-12-09",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 16,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2022-12-09",
        "notes": ""
    },
    {
        "id": "09004",
        "generation": 9,
        "name": "คุณศรีพัฒน์ สุขอารีย์",
        "nickname": "",
        "applyDate": "2024-06-01",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-10",
        "notes": ""
    },
    {
        "id": "01036",
        "generation": 1,
        "name": "คุณยาใจ ไพรัศมีพูลกุล",
        "nickname": "",
        "applyDate": "2024-06-01",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-10",
        "notes": ""
    },
    {
        "id": "35002",
        "generation": 35,
        "name": "คุณธนวรรณ น้อยบัว",
        "nickname": "",
        "applyDate": "2024-06-04",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 35,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-04",
        "notes": ""
    },
    {
        "id": "15002",
        "generation": 15,
        "name": "คุณฉัตรชัย นครสุวรรณ",
        "nickname": "",
        "applyDate": "2024-06-07",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 15,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-10",
        "notes": ""
    },
    {
        "id": "15003",
        "generation": 15,
        "name": "คุณนราเศรษฐ์ นิธิกรสุรวงศ์",
        "nickname": "",
        "applyDate": "2024-06-07",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 15,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-07",
        "notes": ""
    },
    {
        "id": "14015",
        "generation": 14,
        "name": "คุณอัครเดช รุ่งเรือง",
        "nickname": "ต่อ",
        "applyDate": "2024-06-07",
        "birthDate": "1967-07-02",
        "phone": "091-882-6535",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "61/237 ลำลูกกา ลำลูกกา ปทุมธานี 12130",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-07",
        "notes": ""
    },
    {
        "id": "01022",
        "generation": 1,
        "name": "คุณศักดิ์ชัย ปัญจะพรกุล",
        "nickname": "ช้าง",
        "applyDate": "20024-06-10",
        "birthDate": "1954-07-17",
        "phone": "087-028-6888",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "848 ถ.กิ่งแก้ว ลาดกระบัง ลาดกระบัง กรุงเทพฯ 10520",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-04",
        "notes": ""
    },
    {
        "id": "19023",
        "generation": 19,
        "name": "คุณลภัสรดา กัณหาชาลี",
        "nickname": "",
        "applyDate": "2024-06-10",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01007",
        "generation": 1,
        "name": "คุณไพโรจน์ ใจจริงจิตร",
        "nickname": "เหลียง",
        "applyDate": "2024-06-14",
        "birthDate": "1952-11-16",
        "phone": "081-526-2475",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1006 ถ.สามเสน ถนนนครไชยศรี ดุสิต กรุงเทพฯ 10300",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-04",
        "notes": ""
    },
    {
        "id": "01020",
        "generation": 1,
        "name": "คุณต่อศักดิ์ ปุงคานนท์",
        "nickname": "ต่อ",
        "applyDate": "2024-06-13",
        "birthDate": "1954-06-06",
        "phone": "062-795-5252",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "58/11 หมู่ 14 บางม่วง บางใหญ่ นนทบุรี",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-04",
        "notes": ""
    },
    {
        "id": "01144",
        "generation": 1,
        "name": "คุณวุฒิชัย เนตรงามวงศ์",
        "nickname": "",
        "applyDate": "2024-06-13",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-13",
        "notes": ""
    },
    {
        "id": "06001",
        "generation": 6,
        "name": "คุณนิวิษฐ์ เส้นเศษ",
        "nickname": "",
        "applyDate": "2024-06-13",
        "birthDate": "1955-12-10",
        "phone": "081-685-5985",
        "lineId": "nivid5985",
        "facebook": "",
        "email": "",
        "address": "7/281 ซ.รามคำแหง 152 สะพานสูง สะพานสูง กรุงเทพฯ 10240",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-21",
        "notes": ""
    },
    {
        "id": "08004",
        "generation": 8,
        "name": "คุณสุริยันต์ บุตรศรี",
        "nickname": "",
        "applyDate": "2024-06-17",
        "birthDate": "",
        "phone": "089-681-9010",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 8,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-15",
        "notes": ""
    },
    {
        "id": "09019",
        "generation": 9,
        "name": "คุณพิมพิภัช เลี๊ยบประเสริฐ",
        "nickname": "",
        "applyDate": "2024-06-24",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-24",
        "notes": ""
    },
    {
        "id": "09020",
        "generation": 9,
        "name": "คุณสุภาภรณ์ แก้วรัตนะอัมพร",
        "nickname": "",
        "applyDate": "2024-06-24",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-06-24",
        "notes": ""
    },
    {
        "id": "27002",
        "generation": 27,
        "name": "คุณภคิน หาญกิตติสกุล",
        "nickname": "",
        "applyDate": "2024-06-25",
        "birthDate": "",
        "phone": "890-065-4222",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 27,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-25",
        "notes": ""
    },
    {
        "id": "27003",
        "generation": 27,
        "name": "คุณณีรนุช ขาวมีศรี",
        "nickname": "",
        "applyDate": "2024-06-25",
        "birthDate": "",
        "phone": "081-265-0945",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 27,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-25",
        "notes": ""
    },
    {
        "id": "05008",
        "generation": 5,
        "name": "คุณสิริพงศ์ พัฒนทวีกิจ",
        "nickname": "",
        "applyDate": "2024-06-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-26",
        "notes": ""
    },
    {
        "id": "05009",
        "generation": 5,
        "name": "คุณสุชาดา โสมโสรส",
        "nickname": "",
        "applyDate": "2024-06-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-26",
        "notes": ""
    },
    {
        "id": "09013",
        "generation": 9,
        "name": "คุณณรงค์ศักดิ์ แสงชาวนา",
        "nickname": "",
        "applyDate": "2024-06-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-26",
        "notes": ""
    },
    {
        "id": "12007",
        "generation": 12,
        "name": "คุณวัลลภ สุขเจริญ",
        "nickname": "",
        "applyDate": "2024-06-27",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-06-27",
        "notes": ""
    },
    {
        "id": "26001",
        "generation": 26,
        "name": "คุณศิริรัตน์ วิลาลัย",
        "nickname": "",
        "applyDate": "2024-07-14",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 26,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-07-14",
        "notes": ""
    },
    {
        "id": "19024",
        "generation": 19,
        "name": "คุณพนอ พวงหิมวันต์",
        "nickname": "",
        "applyDate": "2024-07-27",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-05",
        "notes": ""
    },
    {
        "id": "19025",
        "generation": 19,
        "name": "คุณดุจเดือน วงษ์บุญหนัก",
        "nickname": "",
        "applyDate": "2024-07-27",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-07-05",
        "notes": ""
    },
    {
        "id": "19026",
        "generation": 19,
        "name": "คุณศศิลักษณ์ หวานฉ่ำ",
        "nickname": "",
        "applyDate": "2024-08-01",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-09",
        "notes": ""
    },
    {
        "id": "19027",
        "generation": 19,
        "name": "คุณธนันวัฒน์ ธนบวรสวัสดิ์",
        "nickname": "",
        "applyDate": "2024-08-08",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-13",
        "notes": ""
    },
    {
        "id": "35003",
        "generation": 35,
        "name": "คุณนิยากรณ์ แวววงษ์",
        "nickname": "",
        "applyDate": "2024-08-11",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 35,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-09-12",
        "notes": ""
    },
    {
        "id": "39001",
        "generation": 39,
        "name": "คุณบุรินธร ศิริชุมพันธ์",
        "nickname": "",
        "applyDate": "2024-08-14",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 39,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-08-14",
        "notes": ""
    },
    {
        "id": "15004",
        "generation": 15,
        "name": "คุณบุญชัย สิริสิทธิกรสกุล",
        "nickname": "",
        "applyDate": "2024-08-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 15,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-16",
        "notes": ""
    },
    {
        "id": "18015",
        "generation": 18,
        "name": "คุณกุลรัตน์ หมั่นเสดาะ",
        "nickname": "กุ๊งกิ๊ง",
        "applyDate": "2024-10-06",
        "birthDate": "",
        "phone": "063-453-9265",
        "lineId": "kungkingda",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-29",
        "notes": ""
    },
    {
        "id": "02019",
        "generation": 2,
        "name": "คุณสมศิริ คุ้มปิยะผล",
        "nickname": "",
        "applyDate": "2024-10-07",
        "birthDate": "",
        "phone": "081-956-4604",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-04",
        "notes": ""
    },
    {
        "id": "07020",
        "generation": 7,
        "name": "คุณวิเชียร มาลัยทอง",
        "nickname": "",
        "applyDate": "2024-10-08",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-10-08",
        "notes": ""
    },
    {
        "id": "19028",
        "generation": 19,
        "name": "คุณศิริวรรณ ตระหง่าน",
        "nickname": "",
        "applyDate": "2024-11-07",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-11-07",
        "notes": ""
    },
    {
        "id": "09021",
        "generation": 9,
        "name": "คุณผุษดี จำเริญทอง",
        "nickname": "ปี๊ด",
        "applyDate": "2024-11-08",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-11-08",
        "notes": ""
    },
    {
        "id": "09022",
        "generation": 9,
        "name": "คุณกิตติยา ทองเอี่ยม",
        "nickname": "ตุ๊ก",
        "applyDate": "2024-11-08",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2024-11-08",
        "notes": ""
    },
    {
        "id": "22001",
        "generation": 22,
        "name": "คุณพิสิษฐ์ จิรานนท์สุภนิจ",
        "nickname": "ก้อง",
        "applyDate": "2024-11-27",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 22,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-25",
        "notes": ""
    },
    {
        "id": "09015",
        "generation": 9,
        "name": "คุณดวงเดือน เพียรพิจารณ์",
        "nickname": "ปุ๊",
        "applyDate": "2025-02-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-01-08",
        "notes": ""
    },
    {
        "id": "06015",
        "generation": 6,
        "name": "คุณสุรีย์รัตน์ สวัสดี",
        "nickname": "",
        "applyDate": "2025-02-21",
        "birthDate": "1959-11-20",
        "phone": "089-876-4899",
        "lineId": "0898764899",
        "facebook": "",
        "email": "",
        "address": "869 มบ.บดินทรรักษา ถ.ลาดพร้าว พลับพลา วังทองหลาง กรุงเทพฯ 10310",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-02-03",
        "notes": ""
    },
    {
        "id": "19029",
        "generation": 19,
        "name": "คุณกิ่งกมล ขำรักษ์",
        "nickname": "กิ่ง",
        "applyDate": "2025-04-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-11",
        "notes": ""
    },
    {
        "id": "02020",
        "generation": 2,
        "name": "คุณวนิดา รุ่งสถิรมน",
        "nickname": "ดา",
        "applyDate": "2025-04-18",
        "birthDate": "1953-10-28",
        "phone": "081-346-1855",
        "lineId": "0813461855",
        "facebook": "",
        "email": "",
        "address": "190/17 หมู่ 16 บางเสาธง บางเสาธง สมุทรปราการ 10540",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-04",
        "notes": ""
    },
    {
        "id": "01145",
        "generation": 1,
        "name": "คุณสุนทร ปลื้มมนู",
        "nickname": "",
        "applyDate": "2025-04-24",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-04-24",
        "notes": ""
    },
    {
        "id": "09016",
        "generation": 9,
        "name": "คุณอรัชฌา เงินวิลัย",
        "nickname": "",
        "applyDate": "2025-04-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-04-01",
        "notes": ""
    },
    {
        "id": "24003",
        "generation": 24,
        "name": "คุณนิรมล ยะมานนท์",
        "nickname": "",
        "applyDate": "2025-05-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 24,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-14",
        "notes": ""
    },
    {
        "id": "14015",
        "generation": 14,
        "name": "คุณอุรวี กอบสันเทียะ",
        "nickname": "",
        "applyDate": "2025-05-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-10",
        "notes": ""
    },
    {
        "id": "34003",
        "generation": 34,
        "name": "คุณธภาภัค คงกระพันธ์",
        "nickname": "",
        "applyDate": "2025-05-06",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 34,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-05-06",
        "notes": ""
    },
    {
        "id": "02021",
        "generation": 2,
        "name": "คุณจันทร์เพ็ญ สิทธิพจน์",
        "nickname": "เพ็ญ",
        "applyDate": "2025-05-08",
        "birthDate": "1955-02-04",
        "phone": "080-457-8461",
        "lineId": "804578461",
        "facebook": "",
        "email": "",
        "address": "109/118 หมู่ 9 มบ.อินดี้ 2 (บางนา กม.7) บางแก้ว บางพลี สมุทรปราการ 10540",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-03",
        "notes": ""
    },
    {
        "id": "20001",
        "generation": 20,
        "name": "คุณศตณัฎ ญาณโช",
        "nickname": "",
        "applyDate": "2025-05-10",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 20,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-11",
        "notes": ""
    },
    {
        "id": "19030",
        "generation": 19,
        "name": "คุณเมธาพร นรจีน",
        "nickname": "",
        "applyDate": "2025-06-09",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-03",
        "notes": ""
    },
    {
        "id": "01146",
        "generation": 1,
        "name": "คุณสันทนา ว่องวุฒิจริยา",
        "nickname": "",
        "applyDate": "2025-08-25",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-08-25",
        "notes": ""
    },
    {
        "id": "29001",
        "generation": 29,
        "name": "คุณวิรณัฐ์ เรืองรังสรรค์",
        "nickname": "นา",
        "applyDate": "2025-10-05",
        "birthDate": "1983-09-14",
        "phone": "085-153-0795",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 29,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-05",
        "notes": ""
    },
    {
        "id": "19031",
        "generation": 19,
        "name": "คุณสาธิดา สอนทะ",
        "nickname": "",
        "applyDate": "2025-10-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-05",
        "notes": ""
    },
    {
        "id": "17008",
        "generation": 17,
        "name": "คุณนิสาชล ไกรฤกษ์",
        "nickname": "หร่อย",
        "applyDate": "2025-10-23",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-23",
        "notes": ""
    },
    {
        "id": "24004",
        "generation": 24,
        "name": "คุณถวิล เฉลยวาเรศ",
        "nickname": "",
        "applyDate": "2025-10-19",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 24,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-19",
        "notes": ""
    },
    {
        "id": "02006",
        "generation": 2,
        "name": "คุณพิเชษฐ์ ชัยศิริวิเชียร",
        "nickname": "",
        "applyDate": "2016-02-04",
        "birthDate": "",
        "phone": "081-620-5578",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-10-29",
        "notes": ""
    },
    {
        "id": "30001",
        "generation": 30,
        "name": "คุณอารีรัตน์ แข็งขัน",
        "nickname": "",
        "applyDate": "2025-11-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 30,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2025-11-15",
        "notes": ""
    },
    {
        "id": "19032",
        "generation": 19,
        "name": "คุณบุษบง นาคสุวรรณ",
        "nickname": "",
        "applyDate": "2026-03-04",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-03-04",
        "notes": ""
    },
    {
        "id": "03013",
        "generation": 3,
        "name": "คุณสุดารัตน์ อนุภาษ",
        "nickname": "",
        "applyDate": "2026-03-18",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-03-18",
        "notes": ""
    },
    {
        "id": "37001",
        "generation": 37,
        "name": "คุณเสฐียรพงษ์ สำแดงสุข",
        "nickname": "เพชร",
        "applyDate": "2026-05-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 37,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-22",
        "notes": ""
    },
    {
        "id": "06016",
        "generation": 6,
        "name": "คุณจุติมา เชิดชู",
        "nickname": "ต้อย",
        "applyDate": "2026-05-31",
        "birthDate": "1958-10-29",
        "phone": "085-178-7519",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "53 ถ.รามคำแหง 44 แยก 2 หัวหมาก บางกะปิ กรุงเทพฯ 10240",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-05-31",
        "notes": ""
    },
    {
        "id": "01101",
        "generation": 1,
        "name": "คุณสมทรง อุ้ยพันธ์",
        "nickname": "น้อย",
        "applyDate": "2016-05-28",
        "birthDate": "1952-01-01",
        "phone": "061-712-0534",
        "lineId": "0825798153",
        "facebook": "",
        "email": "",
        "address": "112 ซ.นุ่มอุทิศ ถ.คลองเรียน 1 หาดใหญ่ หาดใหญ่ สงขลา",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-05",
        "notes": "สกุลเดิม/หมายเหตุ: วงศ์วัชรินทร์"
    },
    {
        "id": "42002",
        "generation": 42,
        "name": "คุณสมัชชา ณ พัทลุง",
        "nickname": "",
        "applyDate": "2026-06-17",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 42,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-17",
        "notes": ""
    },
    {
        "id": "10003",
        "generation": 10,
        "name": "คุณสมบัติ หรรษาพันธุ์",
        "nickname": "",
        "applyDate": "2026-06-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 10,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-15",
        "notes": ""
    },
    {
        "id": "ส.3001",
        "generation": 30,
        "name": "พระชัยณรงค์ พรหมทอง",
        "nickname": "",
        "applyDate": "2026-06-15",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 30,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-15",
        "notes": ""
    },
    {
        "id": "40001",
        "generation": 40,
        "name": "คุณกิตติพงศ์ อินทรสันติ์",
        "nickname": "",
        "applyDate": "2026-06-13",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 40,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-13",
        "notes": ""
    },
    {
        "id": "04005",
        "generation": 4,
        "name": "คุณชัยรัตน์ เหล็กเพ็ชร",
        "nickname": "",
        "applyDate": "2026-06-13",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 4,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-13",
        "notes": ""
    },
    {
        "id": "06017",
        "generation": 6,
        "name": "คุณยุวดี บุญใส",
        "nickname": "",
        "applyDate": "2026-06-20",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-20",
        "notes": ""
    },
    {
        "id": "20002",
        "generation": 20,
        "name": "คุณภูวญา วงศ์ทยานิธิ",
        "nickname": "",
        "applyDate": "2026-06-20",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 20,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-20",
        "notes": "สกุลเดิม/หมายเหตุ: สุชาดา"
    },
    {
        "id": "24005",
        "generation": 24,
        "name": "คุณทิตชญา ตันตยานนท์",
        "nickname": "",
        "applyDate": "2026-06-16",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 24,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-16",
        "notes": ""
    },
    {
        "id": "33001",
        "generation": 33,
        "name": "คุณพิพัฒน์ วิเชียรทัศน์",
        "nickname": "",
        "applyDate": "2026-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 33,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-21",
        "notes": ""
    },
    {
        "id": "33002",
        "generation": 33,
        "name": "คุณอนุวัตร แดงน้อย",
        "nickname": "",
        "applyDate": "2026-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 33,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2026-06-21",
        "notes": ""
    },
    {
        "id": "07008",
        "generation": 7,
        "name": "คุณวรพนิจ ลิ้มสกุล",
        "nickname": "",
        "applyDate": "2016-02-11",
        "birthDate": "",
        "phone": "092-2615821",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-11",
        "notes": ""
    },
    {
        "id": "08002",
        "generation": 8,
        "name": "คุณพรวฤณ ณฐารมย์",
        "nickname": "",
        "applyDate": "2016-03-06",
        "birthDate": "",
        "phone": "092-543-4447",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 8,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-06",
        "notes": ""
    },
    {
        "id": "01099",
        "generation": 1,
        "name": "คุณเฉลิมลักษณ์ เอกมณี",
        "nickname": "เลข0301",
        "applyDate": "2016-05-23",
        "birthDate": "",
        "phone": "081-7920209",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-23",
        "notes": ""
    },
    {
        "id": "02017",
        "generation": 2,
        "name": "คุณชลิต หุตางกูร",
        "nickname": "",
        "applyDate": "2020-05-20",
        "birthDate": "",
        "phone": "086-056-6565",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2020-05-20",
        "notes": ""
    },
    {
        "id": "07011",
        "generation": 7,
        "name": "คุณชูชาติ มงคลศิริวัฒนะ",
        "nickname": "",
        "applyDate": "2016-05-30",
        "birthDate": "",
        "phone": "082-782-7016",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-30",
        "notes": ""
    },
    {
        "id": "01025",
        "generation": 1,
        "name": "คุณลักขณา ศรีไตรรัตนรักษ์",
        "nickname": "กุ้ง",
        "applyDate": "2015-06-30",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-30",
        "notes": ""
    },
    {
        "id": "07013",
        "generation": 7,
        "name": "คุณเกษร วรสานร์",
        "nickname": "",
        "applyDate": "2016-06-21",
        "birthDate": "",
        "phone": "082-633-7094",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-21",
        "notes": ""
    },
    {
        "id": "01044",
        "generation": 1,
        "name": "คุณวัชรี ศาสนานนท์",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "087-908-6690",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01045",
        "generation": 1,
        "name": "คุณวิอร สวัสดิแก้ว",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "082-642-6611",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "70/97 ซ.เทศบาล 27 ถ.ถีนานนท์ เมือง กาฬสินธุ์ 46000",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": "สกุลเดิม/หมายเหตุ: อนุกูล รัตนโกศล"
    },
    {
        "id": "01123",
        "generation": 1,
        "name": "คุณสารภี บูรณศิรินทร์",
        "nickname": "แหม่ม",
        "applyDate": "2019-07-11",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-07-11",
        "notes": ""
    },
    {
        "id": "14008",
        "generation": 14,
        "name": "คุณมนตรี กิติโกญจนาท",
        "nickname": "",
        "applyDate": "2020-08-08",
        "birthDate": "",
        "phone": "097-084-3377",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2020-08-08",
        "notes": ""
    },
    {
        "id": "17001",
        "generation": 17,
        "name": "คุณปนัดดา สิริวุฒิ",
        "nickname": "",
        "applyDate": "2020-08-09",
        "birthDate": "",
        "phone": "089-113-1039",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 17,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2020-08-09",
        "notes": ""
    },
    {
        "id": "06008",
        "generation": 6,
        "name": "คุณปรีดารัชต์ วงศ์กระจ่าง",
        "nickname": "",
        "applyDate": "2020-11-09",
        "birthDate": "",
        "phone": "095-597-871",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2020-09-11",
        "notes": ""
    },
    {
        "id": "14009",
        "generation": 14,
        "name": "คุณปรีชาพล หงษ์ทอง",
        "nickname": "",
        "applyDate": "2020-12-09",
        "birthDate": "",
        "phone": "092-939-7952",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2020-09-12",
        "notes": ""
    },
    {
        "id": "01002",
        "generation": 1,
        "name": "คุณจิว จิรอลงกรณ์",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "081-854-9019",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-21",
        "notes": ""
    },
    {
        "id": "01003",
        "generation": 1,
        "name": "คุณชรินทร์ แซ่เอ็ง",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "086-446-6035",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "202/54 ไลฟ์บางกอกบูเลอวาร์ด วงแหวนอ่อนนุช ถ.กาญจนาภิเษก ดอกไม้ ประเวศ กทม",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-21",
        "notes": ""
    },
    {
        "id": "01067",
        "generation": 1,
        "name": "คุณศิริพงษ์ วิชัย",
        "nickname": "",
        "applyDate": "2015-08-10",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-10",
        "notes": ""
    },
    {
        "id": "01068",
        "generation": 1,
        "name": "คุณจันทร ศิริธางกุล",
        "nickname": "",
        "applyDate": "2015-08-11",
        "birthDate": "",
        "phone": "094-3055-665",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-11",
        "notes": ""
    },
    {
        "id": "01072",
        "generation": 1,
        "name": "คุณฤทัยรัตน์ บุญเกิด",
        "nickname": "เล็ก",
        "applyDate": "2015-08-16",
        "birthDate": "",
        "phone": "094-606-8695",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-16",
        "notes": ""
    },
    {
        "id": "01073",
        "generation": 1,
        "name": "คุณเบญจวรรณ บริบูรณ์",
        "nickname": "",
        "applyDate": "2015-08-17",
        "birthDate": "",
        "phone": "089-523-5391",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-17",
        "notes": ""
    },
    {
        "id": "01076",
        "generation": 1,
        "name": "คุณดุสิต นันชนก",
        "nickname": "ต๋อย",
        "applyDate": "2015-08-27",
        "birthDate": "",
        "phone": "089-788-2333",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-27",
        "notes": ""
    },
    {
        "id": "01080",
        "generation": 1,
        "name": "คุณชนากานต์ ธรรมสโรจ",
        "nickname": "",
        "applyDate": "2015-10-02",
        "birthDate": "",
        "phone": "099-015-2114",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-10-02",
        "notes": ""
    },
    {
        "id": "02005",
        "generation": 2,
        "name": "คุณอนุชิต วาณิชย์เสริมกุล",
        "nickname": "",
        "applyDate": "2016-01-31",
        "birthDate": "",
        "phone": "081-733-6838",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-31",
        "notes": ""
    },
    {
        "id": "21001",
        "generation": 21,
        "name": "คุณกิตติพัฒน์ สัมมาพาณิชกุล",
        "nickname": "",
        "applyDate": "2016-09-21",
        "birthDate": "",
        "phone": "086-176-0522",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 21,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-09-21",
        "notes": ""
    },
    {
        "id": "01035",
        "generation": 1,
        "name": "คุณสมพงศ์ นันทไพบูลย์",
        "nickname": "",
        "applyDate": "2015-07-06",
        "birthDate": "",
        "phone": "061-629-6950",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-02-07",
        "notes": ""
    },
    {
        "id": "01064",
        "generation": 1,
        "name": "คุณเกรียงศักดิ์ โตยิ่งไพบูลย์",
        "nickname": "",
        "applyDate": "2015-07-31",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2021-06-06",
        "notes": ""
    },
    {
        "id": "01005",
        "generation": 1,
        "name": "คุณชัยอนันต์ อารยะพิดิษฐ์",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "44/165 ซ.นาคนิวาส 27 แยก 6 ถ.ลาดพร้าว ลาดพร้าว ลาดพร้าว กทม 10230",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-21",
        "notes": ""
    },
    {
        "id": "01012",
        "generation": 1,
        "name": "คุนสุนทร ปลึ้มมนู",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "094-552-0995",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-21",
        "notes": ""
    },
    {
        "id": "01016",
        "generation": 1,
        "name": "คุณอาภรณ์ ฟักศิริ",
        "nickname": "",
        "applyDate": "2015-06-21",
        "birthDate": "",
        "phone": "091-495-6411",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-21",
        "notes": ""
    },
    {
        "id": "01023",
        "generation": 1,
        "name": "คุณมุกดา สุขเกษม",
        "nickname": "",
        "applyDate": "2015-06-28",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-06-28",
        "notes": ""
    },
    {
        "id": "01026",
        "generation": 1,
        "name": "คุณสุรพล ศรีสรรค์ศักด์",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-05",
        "notes": ""
    },
    {
        "id": "01029",
        "generation": 1,
        "name": "คุณประพันธ์ ขุนหอม",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "086-633-4849",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "165 หมู่บ้านดิเอมเมอรัลด์ปาร์ค ซ.เรวดี 61 ถ.เรวดี ตลาดขวัญ เมือง นนทบุรี 11000",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-05",
        "notes": ""
    },
    {
        "id": "01031",
        "generation": 1,
        "name": "คุณมาลินี โอสถศิลป์",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-05",
        "notes": ""
    },
    {
        "id": "01032",
        "generation": 1,
        "name": "คุณนภัสนันท์ ศรีวงษ์",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "111/303 บางเดื่อ เมือง ปทุมธานี",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-05",
        "notes": ""
    },
    {
        "id": "01033",
        "generation": 1,
        "name": "คุณดวงพร อัมระนันทน์",
        "nickname": "น๊อต",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "081-8351210",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-05",
        "notes": ""
    },
    {
        "id": "01034",
        "generation": 1,
        "name": "คุณเบญจวรรณ ผลดีนานา",
        "nickname": "",
        "applyDate": "2015-07-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-05",
        "notes": ""
    },
    {
        "id": "01042",
        "generation": 1,
        "name": "คุณรัตนาภรณ์ รัตนมาลี",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "089-108-5784",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01052",
        "generation": 1,
        "name": "คุณเจนจิตต์ พานทอง",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "081-805-3539",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01053",
        "generation": 1,
        "name": "คุณชวนชม ปริญญาณัฎฐ์",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "085-053-4486",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01055",
        "generation": 1,
        "name": "คุณรุ่งนภา อินทรเสน",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01056",
        "generation": 1,
        "name": "คุณอรุณี กุลวนัชชภรณ์",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01057",
        "generation": 1,
        "name": "คุณนัยนา กัญมาศ",
        "nickname": "",
        "applyDate": "2015-07-20",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-20",
        "notes": ""
    },
    {
        "id": "01062",
        "generation": 1,
        "name": "คุณธนาวรรณ พัชรพงษ์พันธ์",
        "nickname": "ต้อย",
        "applyDate": "2015-07-28",
        "birthDate": "",
        "phone": "090-401-3737",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-28",
        "notes": ""
    },
    {
        "id": "01063",
        "generation": 1,
        "name": "คุณพงษ์เทพ สุทธานันต์",
        "nickname": "",
        "applyDate": "2015-07-28",
        "birthDate": "",
        "phone": "083-887-8838",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-07-28",
        "notes": ""
    },
    {
        "id": "01065",
        "generation": 1,
        "name": "คุณดิศพงศ์ รุ้งธนาลาภ",
        "nickname": "",
        "applyDate": "2015-08-05",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-05",
        "notes": ""
    },
    {
        "id": "01066",
        "generation": 1,
        "name": "คุณวินัย สุขมาก",
        "nickname": "",
        "applyDate": "2015-08-07",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-07",
        "notes": ""
    },
    {
        "id": "01069",
        "generation": 1,
        "name": "คุณชญาดา เจริญพร",
        "nickname": "จงกลนี",
        "applyDate": "2015-08-11",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-11",
        "notes": ""
    },
    {
        "id": "01074",
        "generation": 1,
        "name": "คุณชยุด  ชินะอาคตะกุล",
        "nickname": "เก๊",
        "applyDate": "2015-08-24",
        "birthDate": "",
        "phone": "081-4837358",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-24",
        "notes": ""
    },
    {
        "id": "01075",
        "generation": 1,
        "name": "คุณนวลจันทร์ เพ็ญชาติ",
        "nickname": "แตน",
        "applyDate": "2015-08-26",
        "birthDate": "",
        "phone": "092-424-1464",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-26",
        "notes": ""
    },
    {
        "id": "01077",
        "generation": 1,
        "name": "คุณสมเดช ลิมป์ปิฎกบุญ",
        "nickname": "",
        "applyDate": "2015-08-27",
        "birthDate": "",
        "phone": "085-142-1815",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-08-27",
        "notes": ""
    },
    {
        "id": "01078",
        "generation": 1,
        "name": "คุณมัสยา แสงโนรี",
        "nickname": "F บ้านบึง",
        "applyDate": "2015-09-16",
        "birthDate": "",
        "phone": "092-329-4442",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-09-16",
        "notes": ""
    },
    {
        "id": "01081",
        "generation": 1,
        "name": "คุณพรประสิทธิ์ อ่อนน้อมดี",
        "nickname": "",
        "applyDate": "2015-10-10",
        "birthDate": "",
        "phone": "081-526-8244",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2015-10-10",
        "notes": ""
    },
    {
        "id": "02001",
        "generation": 2,
        "name": "คุณนิตยา เจริญสุข",
        "nickname": "",
        "applyDate": "2016-01-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-26",
        "notes": ""
    },
    {
        "id": "03001",
        "generation": 3,
        "name": "คุณสุณีย์ ยอดบริบูรณ์",
        "nickname": "",
        "applyDate": "2016-01-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-26",
        "notes": ""
    },
    {
        "id": "02002",
        "generation": 2,
        "name": "คุณสมศักดิ์ จงสุตกวีวงศ์",
        "nickname": "",
        "applyDate": "2016-01-26",
        "birthDate": "",
        "phone": "086-548-6538",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-26",
        "notes": ""
    },
    {
        "id": "02003",
        "generation": 2,
        "name": "คุณศิริกุล ยุทธบรรดล",
        "nickname": "",
        "applyDate": "2016-01-28",
        "birthDate": "",
        "phone": "081-842-5839",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-28",
        "notes": ""
    },
    {
        "id": "03002",
        "generation": 3,
        "name": "คุณธนาวดี ดุลย์โกวิท",
        "nickname": "",
        "applyDate": "2016-01-28",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1554 ซอย F2 บ้านสินธร ถ.รังสิต-ปทุมธานี บางพูน เมือง ปทุมธานี 12000",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-28",
        "notes": ""
    },
    {
        "id": "12001",
        "generation": 12,
        "name": "คุณเชษฐ์ชนัต  วัฒนานานนท์",
        "nickname": "",
        "applyDate": "2016-01-26",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "56 หมู่บ้านวรางกูร ซอย 1 ต.ประชาธิปัตย์ ธัญญะบุรี ปทุมธานี 12130",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-26",
        "notes": "สกุลเดิม/หมายเหตุ: /บุนนาค"
    },
    {
        "id": "03005",
        "generation": 3,
        "name": "คุณสุรพันธ์ โล่ห์นิมิตร",
        "nickname": "ตี๋",
        "applyDate": "2016-01-29",
        "birthDate": "",
        "phone": "081-442-5044",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-29",
        "notes": ""
    },
    {
        "id": "03006",
        "generation": 3,
        "name": "คุณจตุพร หาญวรวงค์",
        "nickname": "",
        "applyDate": "2016-01-30",
        "birthDate": "",
        "phone": "091-740-6597",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-01-30",
        "notes": ""
    },
    {
        "id": "05002",
        "generation": 5,
        "name": "คุณนิจ อุฬารกุล",
        "nickname": "",
        "applyDate": "2016-02-03",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-03",
        "notes": ""
    },
    {
        "id": "06001",
        "generation": 6,
        "name": "คุณนิวิษฐ์ เส้นเศษ",
        "nickname": "",
        "applyDate": "2016-02-05",
        "birthDate": "",
        "phone": "081-685-5985",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "159 ซ.รามคำแหง 36 ถ.รามคำแหง หัวหมาก บางกะปิ กทม 10240",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-05",
        "notes": ""
    },
    {
        "id": "06002",
        "generation": 6,
        "name": "คุณกัญจณาพรรษ์  งามธนาวัฒน์",
        "nickname": "",
        "applyDate": "2016-02-08",
        "birthDate": "",
        "phone": "086-378-4239",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-08",
        "notes": ""
    },
    {
        "id": "06003",
        "generation": 6,
        "name": "คุณสงวน เทียมมีเชาว์",
        "nickname": "",
        "applyDate": "2016-02-09",
        "birthDate": "",
        "phone": "089-955-3251",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-09",
        "notes": ""
    },
    {
        "id": "06004",
        "generation": 6,
        "name": "คุณจำเป็น จิตร์หมื่นไวย์",
        "nickname": "",
        "applyDate": "2016-02-10",
        "birthDate": "",
        "phone": "081-801-3254",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-10",
        "notes": ""
    },
    {
        "id": "02007",
        "generation": 2,
        "name": "คุณโสสุพร พรหมศาสตร์",
        "nickname": "",
        "applyDate": "2016-02-10",
        "birthDate": "",
        "phone": "081-751-9428",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-10",
        "notes": ""
    },
    {
        "id": "02008",
        "generation": 2,
        "name": "คุณสุรสิทธิ์ ฐิติกุลบดี",
        "nickname": "",
        "applyDate": "2016-02-10",
        "birthDate": "",
        "phone": "089-682-9171",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-10",
        "notes": ""
    },
    {
        "id": "07005",
        "generation": 7,
        "name": "คุณปิยะวรรณ ชลวีระวงศ์",
        "nickname": "",
        "applyDate": "2016-02-10",
        "birthDate": "",
        "phone": "081-889-316",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-10",
        "notes": ""
    },
    {
        "id": "07006",
        "generation": 7,
        "name": "คุณวลัยลักษณ์ โฟลเคเมอร์",
        "nickname": "",
        "applyDate": "2016-02-11",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "329 ถ.สุขุมวิท 77 ซ.อ่อนนุช 10 สวนหลวง สวนหลวง กทม 10250",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-11",
        "notes": ""
    },
    {
        "id": "02009",
        "generation": 2,
        "name": "คุณทวี ลาภวิไล",
        "nickname": "",
        "applyDate": "2016-02-11",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "81 ซ.พึ่งมี 32 ถ.สุขุมวิท 93 บางจาก พระโขนง กทม",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-11",
        "notes": ""
    },
    {
        "id": "05003",
        "generation": 5,
        "name": "คุณสัมพันธ์ เจริญไกรศรี",
        "nickname": "",
        "applyDate": "2016-02-16",
        "birthDate": "",
        "phone": "089-920-5915",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-16",
        "notes": ""
    },
    {
        "id": "05004",
        "generation": 5,
        "name": "คุณสุภา ยงศ์พีระกุล",
        "nickname": "",
        "applyDate": "2016-02-19",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 5,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-19",
        "notes": ""
    },
    {
        "id": "02010",
        "generation": 2,
        "name": "คุณนิตยาพร เสมอพันธ์",
        "nickname": "",
        "applyDate": "2016-02-19",
        "birthDate": "",
        "phone": "081-330-4192",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "7/281 ซ.รามคำแหง 152 ถ.รามคำแหง สะพานสูง สะพานสูง กทม",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-19",
        "notes": ""
    },
    {
        "id": "13003",
        "generation": 13,
        "name": "คุณเพชรลดา รูส",
        "nickname": "",
        "applyDate": "2016-02-19",
        "birthDate": "",
        "phone": "092-575-5555",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-19",
        "notes": ""
    },
    {
        "id": "02012",
        "generation": 2,
        "name": "คุณพิศิษฐ์ ลีลาวชิโรภาส",
        "nickname": "",
        "applyDate": "2016-02-22",
        "birthDate": "",
        "phone": "081-753-7821",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "204/5 หมู่บ้านสัมมากร ถ.รามคำแหง สะพานสูง สะพานสูง กทม 10240",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-22",
        "notes": ""
    },
    {
        "id": "02013",
        "generation": 2,
        "name": "คุณสุรพงศ์ รังสิทศคุณ",
        "nickname": "",
        "applyDate": "2016-02-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1006 ถนนสามเสน นครไชยศรี ดุสิต กทม 10330",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-02-22",
        "notes": ""
    },
    {
        "id": "08001",
        "generation": 8,
        "name": "คุณสมพิจิตร ชัยชนะจารักษ์",
        "nickname": "",
        "applyDate": "2016-03-02",
        "birthDate": "",
        "phone": "081-207-2003",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 8,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-02",
        "notes": ""
    },
    {
        "id": "06005",
        "generation": 6,
        "name": "คุณพิภพ ด่านทิพารักษ์",
        "nickname": "",
        "applyDate": "2016-03-03",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 6,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-03",
        "notes": ""
    },
    {
        "id": "13004",
        "generation": 13,
        "name": "คุณอุ้ม วิรัตน์เกษม",
        "nickname": "",
        "applyDate": "2016-03-05",
        "birthDate": "",
        "phone": "098-229-4165",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-05",
        "notes": ""
    },
    {
        "id": "14001",
        "generation": 14,
        "name": "คุณประเพียร อชินีทองคำ",
        "nickname": "ทอย",
        "applyDate": "2016-03-13",
        "birthDate": "",
        "phone": "091-730-4440",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-13",
        "notes": ""
    },
    {
        "id": "18001",
        "generation": 18,
        "name": "คุณธีรวัฒน์ แย้มเพียร",
        "nickname": "",
        "applyDate": "2016-03-13",
        "birthDate": "",
        "phone": "089-892-8721",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "56 ซ.รังสิต-นครนายก 64 ประชาธิปัตย์ ธัญบุรี ปทุมธานี 12130",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-13",
        "notes": ""
    },
    {
        "id": "18002",
        "generation": 18,
        "name": "คุณพิพัฒน์ โพธิ์ศรี",
        "nickname": "",
        "applyDate": "2016-03-13",
        "birthDate": "",
        "phone": "082-499-7172",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "40 ถ.สุขุมวทิ ซอย 97 บางจาก พระโขนง กทม",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-03-13",
        "notes": ""
    },
    {
        "id": "19001",
        "generation": 19,
        "name": "คุณวิศณุ ดีท้วม",
        "nickname": "",
        "applyDate": "2016-04-04",
        "birthDate": "",
        "phone": "085-919-2599",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 19,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-04-04",
        "notes": ""
    },
    {
        "id": "01091",
        "generation": 1,
        "name": "คุณอาลัก ทัศณปริชญานนท์",
        "nickname": "",
        "applyDate": "2016-04-22",
        "birthDate": "",
        "phone": "081-455-5399",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "11/2 ม.13 ถ.เพชรหึงส์ บางกอบัว พระประแดง สมุทรปราการ 10130",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-04-22",
        "notes": ""
    },
    {
        "id": "09002",
        "generation": 9,
        "name": "คุณสิทธิชัย พรมปากดี",
        "nickname": "",
        "applyDate": "2016-05-04",
        "birthDate": "",
        "phone": "085-060-0212",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 9,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-04",
        "notes": ""
    },
    {
        "id": "18003",
        "generation": 18,
        "name": "คุณพชรพร วชิราพรชัยพงศ์",
        "nickname": "",
        "applyDate": "2016-05-15",
        "birthDate": "",
        "phone": "084-871-6262",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 18,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-15",
        "notes": ""
    },
    {
        "id": "02016",
        "generation": 2,
        "name": "คุณวัลลภ ติรณสวัสดิ์",
        "nickname": "",
        "applyDate": "2016-05-16",
        "birthDate": "",
        "phone": "084-405-5868",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 2,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-16",
        "notes": ""
    },
    {
        "id": "07010",
        "generation": 7,
        "name": "คุณสุทธิพร ชินตระกูลรัตน์",
        "nickname": "",
        "applyDate": "2016-05-23",
        "birthDate": "",
        "phone": "089-221-6555",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-23",
        "notes": ""
    },
    {
        "id": "01098",
        "generation": 1,
        "name": "คุณรัชนี อุดมวงค์",
        "nickname": "",
        "applyDate": "2016-05-23",
        "birthDate": "",
        "phone": "086-825-8078",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-05-23",
        "notes": ""
    },
    {
        "id": "01102",
        "generation": 1,
        "name": "นายเกษม ประชุมชน",
        "nickname": "",
        "applyDate": "2016-06-17",
        "birthDate": "",
        "phone": "081-965-6483",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-17",
        "notes": ""
    },
    {
        "id": "07012",
        "generation": 7,
        "name": "คุณศิริวรรณ สุทธิพัฒนะสมบุญ",
        "nickname": "",
        "applyDate": "2016-06-18",
        "birthDate": "",
        "phone": "086-805-1210",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-18",
        "notes": ""
    },
    {
        "id": "07014",
        "generation": 7,
        "name": "คุณกุลกาญจ์ พรสิริฉัตรเพชร",
        "nickname": "",
        "applyDate": "2016-06-22",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "หมูสียา รีสอร์ท  ปากข่อง",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-22",
        "notes": ""
    },
    {
        "id": "07015",
        "generation": 7,
        "name": "คุณผุสดี แจ่มใส",
        "nickname": "",
        "applyDate": "2016-06-24",
        "birthDate": "",
        "phone": "084-087-5203",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-24",
        "notes": ""
    },
    {
        "id": "03009",
        "generation": 3,
        "name": "คุณมณฑล ลิ้มศัตรูพ่าย",
        "nickname": "",
        "applyDate": "2016-06-27",
        "birthDate": "",
        "phone": "081-566-9752",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-27",
        "notes": ""
    },
    {
        "id": "07016",
        "generation": 7,
        "name": "คุณสมนึก ติรพัฒน์กบิล",
        "nickname": "",
        "applyDate": "2016-06-27",
        "birthDate": "",
        "phone": "089-779-1417",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 7,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-06-27",
        "notes": ""
    },
    {
        "id": "14002",
        "generation": 14,
        "name": "คุณทิพยวรรณ พยาฆรินทรังกูร",
        "nickname": "",
        "applyDate": "2016-07-25",
        "birthDate": "",
        "phone": "086-337-3123",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-07-25",
        "notes": ""
    },
    {
        "id": "14003",
        "generation": 14,
        "name": "คุณสมัย ศิริวัฒน์",
        "nickname": "",
        "applyDate": "2016-07-25",
        "birthDate": "",
        "phone": "081-351-4065",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-07-25",
        "notes": ""
    },
    {
        "id": "14004",
        "generation": 14,
        "name": "คุณสมภพ อดุลวิทย์",
        "nickname": "",
        "applyDate": "2016-07-25",
        "birthDate": "",
        "phone": "099-645-1928",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-07-25",
        "notes": ""
    },
    {
        "id": "13006",
        "generation": 13,
        "name": "คุณสมจิต คัมภิริชยา",
        "nickname": "",
        "applyDate": "2016-08-01",
        "birthDate": "",
        "phone": "089-812-5057",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-08-01",
        "notes": ""
    },
    {
        "id": "13007",
        "generation": 13,
        "name": "คุณสุจิรา ฉัตรมเพศ",
        "nickname": "",
        "applyDate": "2016-08-01",
        "birthDate": "",
        "phone": "092-425-5416",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "3/13 ซ.ปรีดีพนมยงค์ 1 สุขุมวิท 71 พระโขนงเหนือ พระโขนง กทม 10110",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-08-01",
        "notes": ""
    },
    {
        "id": "13008",
        "generation": 13,
        "name": "คุณสุวิทย์ เอกัง",
        "nickname": "",
        "applyDate": "2016-08-01",
        "birthDate": "",
        "phone": "089-488-3334",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "114/6 ถ.โพธาราม ซอย 1 ช้างเผือก เมือง เชียงใหม่ 50300",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-08-01",
        "notes": ""
    },
    {
        "id": "12002",
        "generation": 12,
        "name": "คุณเลิศชาย เสรีชวโรจน์",
        "nickname": "",
        "applyDate": "2016-08-21",
        "birthDate": "",
        "phone": "062-325-9879",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-08-21",
        "notes": ""
    },
    {
        "id": "16001",
        "generation": 16,
        "name": "คุณพวงแก้ว ปิติสานต์",
        "nickname": "",
        "applyDate": "2016-10-26",
        "birthDate": "",
        "phone": "081-373-9289",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 16,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-10-26",
        "notes": ""
    },
    {
        "id": "16002",
        "generation": 16,
        "name": "คุณสุริวัสสา ดาวสุขชัยพันธุ์",
        "nickname": "",
        "applyDate": "2016-10-26",
        "birthDate": "",
        "phone": "088-896-8151",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 16,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-10-26",
        "notes": ""
    },
    {
        "id": "16003",
        "generation": 16,
        "name": "คุณกุสุมาลย์ เพชรหล่อ",
        "nickname": "",
        "applyDate": "2016-10-26",
        "birthDate": "",
        "phone": "080-591-7735",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 16,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-10-26",
        "notes": ""
    },
    {
        "id": "13009",
        "generation": 13,
        "name": "คูณณิชชา  วิศาลเมธี",
        "nickname": "",
        "applyDate": "2016-11-30",
        "birthDate": "",
        "phone": "081-809-9822",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-11-30",
        "notes": ""
    },
    {
        "id": "11001",
        "generation": 11,
        "name": "คุณอาภรณ์  หนูห้อง",
        "nickname": "",
        "applyDate": "2016-12-19",
        "birthDate": "",
        "phone": "089-762-7671",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 11,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2016-12-19",
        "notes": ""
    },
    {
        "id": "01107",
        "generation": 1,
        "name": "คุณสุทัต  วงษ์วานิช",
        "nickname": "",
        "applyDate": "2017-01-23",
        "birthDate": "",
        "phone": "081-836-0418",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1 ซ.เสนานิคม 1 ซ.42 แยก 16 ถ.เสนานิคม 1 ลาดพร้าว ลาดพร้าว กทม 10230",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2017-01-23",
        "notes": ""
    },
    {
        "id": "13010",
        "generation": 13,
        "name": "คุณรวิวรรณ  อินทร์จันทร์",
        "nickname": "",
        "applyDate": "2017-03-04",
        "birthDate": "",
        "phone": "081-612-0500",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "1/120 หมู่บ้านพาทาโกเนีย 3 ซ.สามวา 3 ถ.สามวา มีนบุรี มีนบุรี กทม 10510",
        "education": {
            "gen": 13,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2017-03-04",
        "notes": ""
    },
    {
        "id": "01109",
        "generation": 1,
        "name": "คุณเจษฏาพรรณ  ปรองดอง",
        "nickname": "",
        "applyDate": "2017-03-04",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "2100/72 ถ.จันทน์ ช่องนนทรี ยานนาวา กทม 10120",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2017-03-04",
        "notes": ""
    },
    {
        "id": "01110",
        "generation": 1,
        "name": "คุณประสิทธิ์  อึ้งอาภากุล",
        "nickname": "",
        "applyDate": "2017-03-04",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2017-03-04",
        "notes": ""
    },
    {
        "id": "01111",
        "generation": 1,
        "name": "คุณจตุพร ดวงดี",
        "nickname": "",
        "applyDate": "2017-03-14",
        "birthDate": "",
        "phone": "0813272198",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2017-03-14",
        "notes": ""
    },
    {
        "id": "01112",
        "generation": 1,
        "name": "คุณสุวัฒนา เขินประติยุทธ",
        "nickname": "",
        "applyDate": "2017-11-08",
        "birthDate": "",
        "phone": "085-916-2902",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2017-11-08",
        "notes": "สกุลเดิม/หมายเหตุ: จันทนา ดำเก็งรัตน์"
    },
    {
        "id": "03010",
        "generation": 3,
        "name": "คุณเกษมุข สุวรรณเทพ",
        "nickname": "",
        "applyDate": "2018-03-13",
        "birthDate": "",
        "phone": "081-836-7290",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2018-03-13",
        "notes": ""
    },
    {
        "id": "01113",
        "generation": 1,
        "name": "คุณเสน์ห์ หลสุวรรณ",
        "nickname": "",
        "applyDate": "2018-03-31",
        "birthDate": "",
        "phone": "096-569-1078",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2018-03-31",
        "notes": ""
    },
    {
        "id": "03011",
        "generation": 3,
        "name": "คุณประมุก หุ่นสุวรรณ",
        "nickname": "",
        "applyDate": "2018-03-31",
        "birthDate": "",
        "phone": "089-936-2124",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 3,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2018-03-31",
        "notes": ""
    },
    {
        "id": "15001",
        "generation": 15,
        "name": "คุณณิศรามิล โภคินพีรวัศ",
        "nickname": "ภิมม์",
        "applyDate": "2018-10-08",
        "birthDate": "",
        "phone": "098-829-9394",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 15,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2018-10-08",
        "notes": ""
    },
    {
        "id": "01121",
        "generation": 1,
        "name": "คุณปราณี เหมพงศ์พันธุ์",
        "nickname": "",
        "applyDate": "2018-11-04",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2018-11-04",
        "notes": ""
    },
    {
        "id": "12004",
        "generation": 12,
        "name": "คุณพิมพ์ศรี พฤกษจำรูญ",
        "nickname": "",
        "applyDate": "2019-01-06",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-01-06",
        "notes": ""
    },
    {
        "id": "12005",
        "generation": 12,
        "name": "คุณพัทธ์ธีรา ศิทธิโชคสกุลชัย",
        "nickname": "",
        "applyDate": "2019-01-06",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-01-06",
        "notes": ""
    },
    {
        "id": "12006",
        "generation": 12,
        "name": "คุณยุวลักษณ์ จินดาพงศ์",
        "nickname": "",
        "applyDate": "2019-01-06",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 12,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-01-06",
        "notes": ""
    },
    {
        "id": "14007",
        "generation": 14,
        "name": "คุณจันทร์เพ็ญ พลับศิริ",
        "nickname": "",
        "applyDate": "2019-01-08",
        "birthDate": "",
        "phone": "081-615-4801",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 14,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-01-08",
        "notes": ""
    },
    {
        "id": "08003",
        "generation": 8,
        "name": "คุณวุฒิชัย พิพัฒน์รังสรรค์",
        "nickname": "",
        "applyDate": "2019-04-01",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 8,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-04-01",
        "notes": ""
    },
    {
        "id": "01130",
        "generation": 1,
        "name": "คุณกุลธิรา สุขุมพัฒน์",
        "nickname": "",
        "applyDate": "2019-07-11",
        "birthDate": "",
        "phone": "",
        "lineId": "",
        "facebook": "",
        "email": "",
        "address": "",
        "education": {
            "gen": 1,
            "faculty": "",
            "major": ""
        },
        "emergencyContact": {
            "name": "",
            "relationship": "",
            "phone": ""
        },
        "occupation": "",
        "photo": "",
        "isReappliedAfterTermination": false,
        "lastPaymentDate": "2019-07-11",
        "notes": ""
    }
];

const INITIAL_TEACHERS = [
    {
        "id": "A0001",
        "name": "อ.กนกพชร์ ไชยทุ่งฉิน",
        "status": "retired",
        "phone": "0 2510 4490 / 0 2510 0706",
        "address": "56/112 หมู่บ้านปัฐวิกรณ์ 1 ซอย 4 ถ.นวมินทร์ แขวงคลองกุ่ม เขตบึงกุ่ม กรุงเทพฯ 10240",
        "notes": "-"
    },
    {
        "id": "A0002",
        "name": "อ.กรรณิการ์ ถึงฝั่ง",
        "status": "retired",
        "phone": "0 2759 8140 / 08 5199 8746",
        "address": "233/187 หมู่บ้านนันทวันศรีนครินทร์ ซอย 11 ต.บางปิ้ง อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0003",
        "name": "อ.กรอนงค์ จงอรุณงามแสง",
        "status": "retired",
        "phone": "0 2397 5603 / 08 1251 5631",
        "address": "33/187 หมู่ 14 ถ.บางนา-ตราด ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0004",
        "name": "อ.กฤชต์พรรณ พณิชยกุล",
        "status": "retired",
        "phone": "08 6780 4786",
        "address": "15/1 ซอยศิริเกษม 19 แยก 10 ถ.พุทธมณฑลสาย 3 แขวงบางไผ่ เขตบางแค กรุงเทพฯ 10160",
        "notes": "-"
    },
    {
        "id": "A0005",
        "name": "อ.กัญญา จำปา",
        "status": "retired",
        "phone": "0 2328 0303 / 09 6887 8091",
        "address": "98/8 หมู่บ้านอิมพีเรียลพาร์ค ซอย 67 ถ.เฉลิมพระเกียรติ ร.9 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0006",
        "name": "อ.กันยารัตน์ วีระทรัพย์",
        "status": "retired",
        "phone": "08 9678 7705",
        "address": "4221 หมู่ 1 ซ.ด่านสำโรง 50/37 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0007",
        "name": "อ.กัลยาณี จิรนิรันดร์กุล",
        "status": "retired",
        "phone": "08 9168 6161",
        "address": "8/78 หมู่บ้านทาวน์อเวนิว ซ.อ่อนนุช 68 ถ.สุขุมวิท 77 แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0008",
        "name": "อ.กาญจนา ภัยสูญสิ้น",
        "status": "retired",
        "phone": "06 2871 0990",
        "address": "392 ซ.ลาดกระบัง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520",
        "notes": "-"
    },
    {
        "id": "A0009",
        "name": "อ.กุหลาบ ศิริบุญพันธ์",
        "status": "deceased",
        "phone": "0 2393 1358",
        "address": "59/13 ซ.อุดมสุข 13 ถ.สุขุมวิท 103 แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0010",
        "name": "อ.จันทรา ยินดียม",
        "status": "retired",
        "phone": "0 2337 6006 / 06 5868 9684",
        "address": "20 ทุ่งเศรษฐีแยก 27 แขวงดอกไม้ เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0011",
        "name": "อ.จิตรลดา ชัยวิชาชาญ",
        "status": "retired",
        "phone": "09 1887 0464",
        "address": "266 ถ.สุขุมวิท 95 แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0012",
        "name": "อ.จิรพันธ์ สิทธิเขตการ",
        "status": "deceased",
        "phone": "09 4696 3551",
        "address": "216/14 หมู่บ้านไพโรจน์ ถ.บางนา-ตราด กม.4 แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0013",
        "name": "อ.จิราพร คำประพัฒน์",
        "status": "retired",
        "phone": "08 0939 1524",
        "address": "201/135 ม.11 ซ.9 หมู่บ้านบางพลีนคร ถ.เทพารักษ์ ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0014",
        "name": "อ.จุฬาพรรณ มอญโพพาน",
        "status": "deceased",
        "phone": "-",
        "address": "143/69 ม.7 ถ.ศรีวารีน้อย ต.บางโฉลง อ.บางพลี จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0015",
        "name": "อ.จุไร ชั้นประเสริฐ",
        "status": "retired",
        "phone": "0 2996 5179 / 08 6862 0512",
        "address": "431 ซ.7 หมู่บ้านมาลีวัลย์ ถ.รังสิต-นครนายก ธัญบุรี จ.ปทุมธานี 12130",
        "notes": "-"
    },
    {
        "id": "A0016",
        "name": "อ.เฉิดฉาย จิตต์นิยม",
        "status": "deceased",
        "phone": "0 2633 0505 / 08 4680 1131",
        "address": "179 ซอยแก้วฟ้า ถ.สี่พระยา เขตบางรัก กรุงเทพฯ 10500",
        "notes": "-"
    },
    {
        "id": "A0017",
        "name": "อ.ชนาพร สันติกุล",
        "status": "retired",
        "phone": "08 1376 6102",
        "address": "314 ซอยบางนา-ตราด 27 ถ.บางนา-ตราด บางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0018",
        "name": "อ.ชีวิน สาสะเน",
        "status": "retired",
        "phone": "08 0999 9399",
        "address": "8 ซอยอุดมสุข 24 ถ.อุดมสุข (สุขุมวิท 103) แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0019",
        "name": "อ.ช่อ ณัฐปภัชญา",
        "status": "retired",
        "phone": "06 1714 3663",
        "address": "42 ม.1 ต.น้ำเกี๋ยน อ.ภูเพียง จ.น่าน 55000",
        "notes": "-"
    },
    {
        "id": "A0020",
        "name": "อ.ฐิติรักษ์ อรุณรักษ์ติชัย",
        "status": "retired",
        "phone": "0 2332 5278 / 08 9044 5906",
        "address": "867/144 ซอยสุขุมวิท 101 แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0021",
        "name": "อ.ฐานิสร แคนทอง",
        "status": "retired",
        "phone": "08 9680 7705",
        "address": "53/2 ม.6 ต.พรหนิมิต อ.ตาคลี จ.นครสวรรค์",
        "notes": "-"
    },
    {
        "id": "A0022",
        "name": "อ.ณัฐนันทิกา แตงตาด",
        "status": "retired",
        "phone": "0 2361 5777 / 08 5832 2862",
        "address": "29 ซอยล้วน-เจือ อนุสรณ์ 2 ถ.สุขุมวิท 70/3 เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0023",
        "name": "ผอ.ณัฐศุภางค์ นพคุณ",
        "status": "deceased",
        "phone": "09 4810 8857",
        "address": "333/109 ซอย 24/1 หมู่บ้านกฤษณา ถ.กิ่งแก้ว ต.ราชาเทวะ อ.บางพลี จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0024",
        "name": "อ.เดือนเพ็ญ ชุลีสาร",
        "status": "retired",
        "phone": "09 5250 5892",
        "address": "45/1 ถ.สุขุมวิท 60/1 แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0025",
        "name": "อ.ทศพร พูลเจริญ",
        "status": "retired",
        "phone": "08 7797 5990",
        "address": "109/140 ม.1 หมู่บ้านโมดิ-วิลล่า ต.คลองหลวงแพ่ง อ.เมือง จ.ฉะเชิงเทรา 24000",
        "notes": "-"
    },
    {
        "id": "A0026",
        "name": "อ.ทองธิว ภัยสูญสิ้น",
        "status": "retired",
        "phone": "08 9887 1845",
        "address": "392 ซอยลาดกระบัง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520",
        "notes": "-"
    },
    {
        "id": "A0027",
        "name": "อ.ธวัชชัย บำรุงกิจ",
        "status": "retired",
        "phone": "0 2747 9885 / 08 1291 7113",
        "address": "43 ซอยอุดมสุข 15 ถ.สุขุมวิท 103 แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0028",
        "name": "อ.ธานินทร์ ตังคุณากร",
        "status": "retired",
        "phone": "08 7826 7066",
        "address": "18/174 หมู่บ้านเปอร์เฟ็คท์เพลส พัฒนาการ-ศรีนครินทร์ ซ.อ่อนนุช 80 แยก 5 ถ.อ่อนนุช เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0029",
        "name": "อ.ธารามาศ จันทร์นุ้ย",
        "status": "retired",
        "phone": "08 1904 0244 / 09 2891 2832 / 09 3923 6749",
        "address": "109/739 หมู่ 2 หมู่บ้านพฤกษา 28 ต.แพรกษาใหม่ อ.เมือง จ.สมุทรปราการ 10280",
        "notes": "-"
    },
    {
        "id": "A0030",
        "name": "อ.ธีรภัทร หริรัตน์",
        "status": "deceased",
        "phone": "0 2311 3465 / 08 1014 9687",
        "address": "456 ซ.สุขุมวิท 95 ถ.สุขุมวิท แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0031",
        "name": "อ.นภัสภร วรนิธิปรีชา",
        "status": "deceased",
        "phone": "0 2368 2410 / 08 5099 0722",
        "address": "100/305 หมู่บ้านนักกีฬาแหลมทอง ถ.กรุงเทพกรีฑา สะพานสูง กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0032",
        "name": "อ.นันทา เศรษฐปราโมทย์",
        "status": "deceased",
        "phone": "0 2 377 1807",
        "address": "1430 ซอย 47 การเคหะแห่งชาติ ถ.นวมินทร์ แขวงคลองจั่น เขตบางกะปิ กรุงเทพฯ 10240",
        "notes": "-"
    },
    {
        "id": "A0033",
        "name": "อ.นิสา ถาวรรุ่งกิจ",
        "status": "retired",
        "phone": "08 1644 9043",
        "address": "314 ม.1 ต.ห้วยกาบ อ.บ้านโฮ่ง จ.ลำพูน",
        "notes": "-"
    },
    {
        "id": "A0034",
        "name": "อ.นิสา สายสังข์",
        "status": "retired",
        "phone": "0 2953 4042 / 08 1348 2723",
        "address": "37/161 หมู่บ้านเลิศอุบล 4 ซ.นาคนิวาส 48 แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230",
        "notes": "-"
    },
    {
        "id": "A0035",
        "name": "อ.บงกชกุล เจริญสุข",
        "status": "retired",
        "phone": "08 0946 6612",
        "address": "82/4 ม.1 ซ.ภานุวงศ์ 117 ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0036",
        "name": "รอง ผอ.บวรลักษณ์ มะวิญธร",
        "status": "retired",
        "phone": "08 1496 8282",
        "address": "521/233 ถ.หทัยราษฎร์ แขวงสามวาตะวันออก เขตคลองสามวา กรุงเทพฯ 10510",
        "notes": "-"
    },
    {
        "id": "A0037",
        "name": "รอง ผอ.บุญญาลักษณ์ บริบูรณ์",
        "status": "retired",
        "phone": "0 2815 8045 / 08 6568 8049",
        "address": "47/406 ม.5 หมู่บ้านวรารมย์ ซ.16 ถ.ประชาอุทิศ แขวงทุ่งครุ เขตทุ่งครุ กรุงเทพฯ 10140",
        "notes": "-"
    },
    {
        "id": "A0038",
        "name": "อ.บุญนาค บุญพามี",
        "status": "retired",
        "phone": "0 2747 7424 / 08 9256 6561 / 0 3229 5145",
        "address": "15 (59/90) ซ.อุดมสุข 15 ถ.อุดมสุข (สุขุมวิท 103) แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0039",
        "name": "อ.บุญย์ทิพย์ ชมพูพงษ์เกษม",
        "status": "retired",
        "phone": "0 2743 7046 / 08 5112 0190",
        "address": "33 รัตนทิพย์อพาร์ทเม้นท์ ซ.อุดมสุข 18 แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0040",
        "name": "อ.บุบผา ไล้รักษา",
        "status": "retired",
        "phone": "0 2579 2605 / 08 9414 4991",
        "address": "165 ซอยมงคลนิเวศน์ ถ.วิภาวดี-รังสิต แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
        "notes": "-"
    },
    {
        "id": "A0041",
        "name": "ผอ.ปฏิเวธ พึ่งอุบล",
        "status": "retired",
        "phone": "0 2525 2788 / 08 1886 2426",
        "address": "444 ซอยซิตี้โฮม ถ.รัตนาธิเบศร์ ต.บางกระสอ อ.เมือง จ.นนทบุรี 11000",
        "notes": "-"
    },
    {
        "id": "A0042",
        "name": "อ.ประภัสสร ธีรการุณวงศ์",
        "status": "deceased",
        "phone": "0 2392 3416 / 09 3495 5414",
        "address": "123/33 ถ.ประชาชื่น แขวงบางซื่อ เขตดุสิต กรุงเทพฯ 10800",
        "notes": "-"
    },
    {
        "id": "A0043",
        "name": "อ.ประภาพรรณ เบญจรัตนาภรณ์",
        "status": "retired",
        "phone": "08 9140 0381",
        "address": "146 ซอยอ่อนนุช 70 แยก 3 ถ.สุขุมวิท 77 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0044",
        "name": "อ.ประศักดิ์ ปฐมกสิกุล",
        "status": "deceased",
        "phone": "0 2178 1252 / 08 1274 3900",
        "address": "128/196 หมู่บ้านโกลเด้นนัครา อ่อนนุช 65 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0045",
        "name": "ผอ.ประเสริฐ จันโททัย",
        "status": "retired",
        "phone": "08 1809 7983",
        "address": "259/521 ถ.คู้บอน ซ.27 แยก 60 แขวงท่าแร้ง เขตบางเขน กรุงเทพฯ",
        "notes": "-"
    },
    {
        "id": "A0046",
        "name": "อ.ประเสริฐ อินทร์แก้ว",
        "status": "deceased",
        "phone": "0 2391 2939 / 08 4160 4764",
        "address": "301/65 ซอยปรีดีพนมยงค์ 42 ถ.สุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110",
        "notes": "-"
    },
    {
        "id": "A0047",
        "name": "อ.ปริศนา ภู่รอด",
        "status": "retired",
        "phone": "0 2413 4621 / 08 6015 3001",
        "address": "3 ซ.เพชรเกษม 68 แยก 5 ถ.เพชรเกษม แขวงบางแคเหนือ เขตบางแค กรุงเทพฯ",
        "notes": "-"
    },
    {
        "id": "A0048",
        "name": "อ.ปิยะนาถ หวังภักดี",
        "status": "deceased",
        "phone": "08 1407 0390",
        "address": "444 ซอยพัฒนาการ 20 แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0049",
        "name": "อ.ผาณิต ธวัชชัยนันท์",
        "status": "retired",
        "phone": "0 2215 6136",
        "address": "229/3 ซอยวิทยาลัยครูเพชรบุรี ถ.เพชรบุรี แขวงพญาไท เขตพญาไท กรุงเทพฯ 10400",
        "notes": "-"
    },
    {
        "id": "A0050",
        "name": "อ.พรทิพย์ อุคคกิมาพันธุ์",
        "status": "retired",
        "phone": "0 2396 0377 / 08 9897 4432",
        "address": "73 (59/119) ซ.อุดมสุข 15 ถ.สุขุมวิท 103 แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0051",
        "name": "อ.พรพรรณ วัฒนสุขชัย",
        "status": "retired",
        "phone": "0 2747 9565 / 08 6572 8664",
        "address": "18 สุขุมวิท 101/1 ซ.วชิรธรรมสาธิต 22 แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0052",
        "name": "อ.พรพิมล สิงห์อำพล",
        "status": "retired",
        "phone": "06 4362 0899",
        "address": "33 หมู่ 2 ต.ป่าเลา อ.เมือง จ.เพชรบูรณ์ 67000",
        "notes": "-"
    },
    {
        "id": "A0053",
        "name": "อ.พรรณี อินทะแสง",
        "status": "retired",
        "phone": "08 6785 5076",
        "address": "70 หมู่บ้านรวิภา ซ.อุดมสุข 39/1 ถ.สุขุมวิท 103 แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0054",
        "name": "อ.พะจิต ตามประทีป",
        "status": "retired",
        "phone": "0 2376 3272 / 08 9829 9301",
        "address": "324/20 หมู่บ้านเดชา 2 ซ.รามคำแหง 78 ถ.สุขาภิบาล 3 แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",
        "notes": "-"
    },
    {
        "id": "A0055",
        "name": "อ.พัชรินทร์ รัตนกังวานวงศ์",
        "status": "retired",
        "phone": "08 7024 7130",
        "address": "450/191 หมู่ 1 ซ.มังกร-ขันดี ต.แพรกษาใหม่ อ.เมือง จ.สมุทรปราการ 10280",
        "notes": "-"
    },
    {
        "id": "A0056",
        "name": "อ.พาณี ล้ออุทัย",
        "status": "retired",
        "phone": "0 2394 2032 / 08 5324 2458",
        "address": "15/473 หมู่ 10 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0057",
        "name": "อ.พิชัย ทองประยูร",
        "status": "retired",
        "phone": "0 3226 1605 / 08 3177 2160",
        "address": "124/3 หมู่ 2 ต.จอมบึง อ.จอมบึง จ.ราชบุรี 70150",
        "notes": "-"
    },
    {
        "id": "A0058",
        "name": "ผอ.พิพัฒน์ บุญญาสัย",
        "status": "retired",
        "phone": "0 2433 6299 / 0 2435 5589 / 08 6944 9534",
        "address": "143 ซอย 63 (เศวตโยธิน) ถ.จรัญสนิทวงศ์ แขวงบางบำหรุ เขตบางพลัด กรุงเทพฯ 10700",
        "notes": "-"
    },
    {
        "id": "A0059",
        "name": "อ.พูลสุข พงศ์สิฏานนท์",
        "status": "retired",
        "phone": "06 1614 5532",
        "address": "73 ซ.ลาดพร้าววังหิน 80 ถ.ลาดพร้าววังหิน แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230",
        "notes": "-"
    },
    {
        "id": "A0060",
        "name": "อ.เพียงภรณ์ หิรัญวงศ์",
        "status": "retired",
        "phone": "0 2337 4917 / 06 1954 7969 / 09 5054 1597",
        "address": "43 แยก 27 ม.ทุ่งเศรษฐี ถ.บางนา-ตราด แขวงดอกไม้ เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0061",
        "name": "อ.เพ็ญจันทร์ มงคลกุล",
        "status": "retired",
        "phone": "08 5130 8660",
        "address": "52 ซ.สุขุมวิท 93 (พึ่งมี 1) แขวงบางจาก เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0062",
        "name": "อ.เพ็ญนภา จิตรสิริบูรณ์",
        "status": "retired",
        "phone": "08 6098 1313",
        "address": "8/35 ซ.ลาดพร้าว 23 ถ.ลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ 10900",
        "notes": "-"
    },
    {
        "id": "A0063",
        "name": "ผอ.ไพโรจน์ ปวะบุตร",
        "status": "retired",
        "phone": "08 1879 9528",
        "address": "49/1 หมู่ 1 บ้านทุ่งปริญญา ต.ขุหลุ อ.ตระการพืชผล จ.อุบลราชธานี 34130",
        "notes": "-"
    },
    {
        "id": "A0064",
        "name": "อ.เฟื่องยศ สายเพ็ชร",
        "status": "retired",
        "phone": "08 7530 9735",
        "address": "244 ถ.สรรพาวุธ แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0065",
        "name": "อ.มรรยาท วิทยามณีกร",
        "status": "retired",
        "phone": "08 9765 0409",
        "address": "89 ม.7 (Royal Golf) ต.ศีรษะจระเข้น้อย อ.บางเสาธง จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0066",
        "name": "ผอ.มาลี ตรีทศายุธ",
        "status": "retired",
        "phone": "0 2509 4354 / 08 9492 4855",
        "address": "51/424 หมู่บ้านเสนา 88 ซอย 5 ซ.นวลจันทร์ 17 ถ.นวลจันทร์ แขวงคลองกุ่ม เขตบึงกุ่ม กรุงเทพฯ 10230",
        "notes": "-"
    },
    {
        "id": "A0067",
        "name": "อ.มาลี ธนะนันท์กูล",
        "status": "deceased",
        "phone": "0 2392 3416 / 09 3495 5414",
        "address": "394 ซ.ปรีดีพนมยงค์ 42 แยก 6 ถ.สุขุมวิท 71 แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
        "notes": "-"
    },
    {
        "id": "A0068",
        "name": "อ.ยาใจ วิศิษฐ์ศิริกุล",
        "status": "retired",
        "phone": "0 2394 5598 / 08 9103 0260",
        "address": "80/809 ซ.ทิพวัล 55 ถ.เทพารักษ์ ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0069",
        "name": "อ.ยุพดี พิษณุไวศยวาท",
        "status": "retired",
        "phone": "08 7595 5231",
        "address": "44/13 ถ.บ้านปากแรต 4 อ.บ้านโป่ง จ.ราชบุรี 70110",
        "notes": "-"
    },
    {
        "id": "A0070",
        "name": "อ.รจนา พูลป้อม",
        "status": "retired",
        "phone": "08 1634 5039",
        "address": "222/796 หมู่ 9 หมู่บ้าน Villaggo Bangna ต.บางบ่อ อ.บางบ่อ จ.สมุทรปราการ 10560",
        "notes": "-"
    },
    {
        "id": "A0071",
        "name": "อ.รัชนี พิทักษ์อรรณพ",
        "status": "retired",
        "phone": "0 2393 1126 / 08 1313 8464",
        "address": "68 หมู่บ้านเคหะนคร 1 ซ.เฉลิมพระเกียรติ 22 แยก 14 ถ.เฉลิมพระเกียรติ ร.9 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0072",
        "name": "อ.รัตกานต์ พันธุ์ดี",
        "status": "retired",
        "phone": "08 1906 3291",
        "address": "3 ซ.ประชาอุทิศ 5 แยก 3-2 แขวงดอนเมือง เขตดอนเมือง กรุงเทพฯ 10210",
        "notes": "-"
    },
    {
        "id": "A0073",
        "name": "อ.รัตนาวรรณ เจริญเสียง",
        "status": "retired",
        "phone": "08 9110 0905",
        "address": "1/20 ถ.สุขาภิบาล 5 ซ.67 แขวงออเงิน เขตสายไหม กรุงเทพฯ 10220",
        "notes": "-"
    },
    {
        "id": "A0074",
        "name": "อ.เรวดี ปราเมศร์",
        "status": "deceased",
        "phone": "0 2398 7822 / 08 2859 8059 (บุ๋ม ลูกสาว)",
        "address": "30/11 ถ.อุดมสุข 26 แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0075",
        "name": "อ.ลาภวารินทร์ บริสุทธิ์ธรรม",
        "status": "retired",
        "phone": "09 1264 1519",
        "address": "9/121 หมู่บ้านเดอะเซนโทร หมู่ 8 ซ.วัดด่านสำโรง ต.สำโรงเหนือ จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0076",
        "name": "อ.ลาวัณย์ อมรประเสริฐศรี",
        "status": "retired",
        "phone": "08 3904 2116",
        "address": "144/104 หมู่บ้านพูนสุข ซอย 5/1 ถ.บางนา-ตราด ต.บางโฉลง อ.บางพลี จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0077",
        "name": "อ.วธู พันธุศิริ",
        "status": "retired",
        "phone": "0 2393 9304 / 08 1423 7979",
        "address": "492 หมู่บ้านเคหะนคร 1 ซอย 22 ถ.เฉลิมพระเกียรติ ร.9 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0078",
        "name": "อ.วนิดา พานิช",
        "status": "retired",
        "phone": "0 2361 0513 / 08 9966 0563",
        "address": "223 ซ.22 ถ.เฉลิมพระเกียรติ ร.9 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0079",
        "name": "อ.วราพร แซ่เฮ้ง",
        "status": "retired",
        "phone": "09 3859 0268",
        "address": "93/12 ซ.สาธุประดิษฐ์ 34 ถ.สาธุประดิษฐ์ แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ 10120",
        "notes": "-"
    },
    {
        "id": "A0080",
        "name": "อ.วัฒนา พุ่มจันทร์",
        "status": "retired",
        "phone": "08 9781 3373",
        "address": "21 ซ.เฉลิมพระเกียรติ ร.9 ซอย 22 แยก 12-1-1 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0081",
        "name": "อ.วัธนีย์วรรณ มัทยากร",
        "status": "retired",
        "phone": "0 2393 5665 / 08 3295 5273",
        "address": "16/69 ซ.สุขุมวิท 68 (โสภณ) ถ.สุขุมวิท บางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0082",
        "name": "อ.วันรัก วงศ์แก้ว",
        "status": "retired",
        "phone": "08 2982 5929",
        "address": "50 หมู่บ้านนภาลัย ซ.6 ถ.สุขุมวิท 70/3 แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0083",
        "name": "อ.วิชัย ศรีสุมาลย์",
        "status": "retired",
        "phone": "0 2393 2658 / 06 3467 7499",
        "address": "726 ม.6 ซ.แบริ่ง 48 ถ.สุขุมวิท 107 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0084",
        "name": "ผอ.วิเชิด ผาสุก",
        "status": "retired",
        "phone": "09 5718 7505",
        "address": "116/2 หมู่ 18 ต.ท่าตะเกียบ อ.ท่าตะเกียบ จ.ฉะเชิงเทรา 24160",
        "notes": "-"
    },
    {
        "id": "A0085",
        "name": "รอง ผอ.วิทยา ปัญญาดี",
        "status": "retired",
        "phone": "0 2876 5083 / 08 1906 9150",
        "address": "95 ซอยตากสิน 24 ถ.ตากสิน เขตธนบุรี กรุงเทพฯ 10600",
        "notes": "-"
    },
    {
        "id": "A0086",
        "name": "อ.วิทยา สุขันทอง",
        "status": "retired",
        "phone": "08 2582 8339",
        "address": "5 ซ.ลาดพร้าว 79 ถ.ลาดพร้าว วังทองหลาง กรุงเทพฯ 10130",
        "notes": "-"
    },
    {
        "id": "A0087",
        "name": "อ.วิไล นครสุวรรณ",
        "status": "retired",
        "phone": "08 1854 4754",
        "address": "76/134 นิรันดร์เรสซิเดนท์ 3 ซ.มหาวิทยาลัยรามคำแหง 2 แขวงดอกไม้ เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0088",
        "name": "อ.วิไลวรรณ เอกพานิช",
        "status": "retired",
        "phone": "08 6334 8271",
        "address": "26/417 พหลโยธิน 64 ถ.พหลโยธิน เขตสายไหม กรุงเทพฯ 10220",
        "notes": "-"
    },
    {
        "id": "A0089",
        "name": "อ.วิน หนูบุตร",
        "status": "retired",
        "phone": "08 9005 8144",
        "address": "18/68 ซ.16 ถ.สวัสดิการ 2 แขวงหนองแขม เขตหนองแขม กรุงเทพฯ 10160",
        "notes": "-"
    },
    {
        "id": "A0090",
        "name": "อ.วีนา ขจีจิตร์",
        "status": "retired",
        "phone": "08 6588 5303",
        "address": "320 ม.6 ซ.อ่อนนุช 44 ถ.อ่อนนุช สวนกลวง กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0091",
        "name": "อ.เวก ศิริพิมลวาทิน",
        "status": "retired",
        "phone": "0 2393 5354 / 08 6096 2166",
        "address": "18/94 ซ.46 ถ.บางนา-ตราด บางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0092",
        "name": "อ.ศรีเงิน แพสุพัฒน์",
        "status": "retired",
        "phone": "0 2399 2021 / 08 1383 7785",
        "address": "45 อาคารพาณิชย์ ซ.46 ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0093",
        "name": "อ.ศิริวรรณ อังกุรวสพร",
        "status": "retired",
        "phone": "0 2462 7136 / 08 3052 4338",
        "address": "200/3 ถ.นครเขื่อนขันธ์ ต.บางผึ้ง อ.พระประแดง จ.สมุทรปราการ 10130",
        "notes": "-"
    },
    {
        "id": "A0094",
        "name": "อ.ส่งศรี ภักดีรัตน์",
        "status": "retired",
        "phone": "0 2396 1903 / 08 1694 0064",
        "address": "21/561 ซ.บางนา-ตราด 12 (ถาวรนิเวศ 2 ซอย 10) ถ.บางนา-ตราด เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0095",
        "name": "อ.สมใจ เดือนฉาย",
        "status": "retired",
        "phone": "0 2398 8787 / 08 6776 9306",
        "address": "112/1616 แฟลต 10 ชั้น 2 การเคหะบางนา ถ.บางนา-ตราด กม.4 เขตพระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0096",
        "name": "อ.สมชาย งามวงศ์ชน",
        "status": "retired",
        "phone": "08 1449 2222",
        "address": "58/95 ม.มณีรินทร์ บางคูวัด อ.เมือง จ.ปทุมธานี",
        "notes": "-"
    },
    {
        "id": "A0097",
        "name": "อ.สมนึก คูณผล",
        "status": "retired",
        "phone": "0 2748 1814 / 08 9692 1009",
        "address": "31 (218) ซ.9 แยก 2 ถ.เฉลิมพระเกียรติ ร.9 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0098",
        "name": "ผอ.สมนึก แตงสกุล",
        "status": "deceased",
        "phone": "-",
        "address": "5/1 ม.8 ซ.เทศบาล 1 ถ.พิบูลย์สงคราม ต.สวนใหญ่ อ.เมือง จ.นนทบุรี 11000",
        "notes": "-"
    },
    {
        "id": "A0099",
        "name": "อ.สมปอง รอดดอน",
        "status": "deceased",
        "phone": "0 2451 6263",
        "address": "6/32 ซ.สะแกงาม 10 (รุ่งทิวา) เขตบางขุนเทียน กรุงเทพฯ 10150",
        "notes": "-"
    },
    {
        "id": "A0100",
        "name": "อ.สมปอง สุขเอี่ยม",
        "status": "deceased",
        "phone": "0 2447 8246 / 09 8424 9801",
        "address": "92/6 หมู่บ้านสุชาวาลัย ม.5 ถ.สุขาภิบาล 1 ต.บางศรีเมือง อ.เมือง จ.นนทบุรี",
        "notes": "-"
    },
    {
        "id": "A0101",
        "name": "รศ.ดร.สมพงษ์ แตงตาด",
        "status": "retired",
        "phone": "0 2361 5777 / 08 1646 4946",
        "address": "29 ซอยล้วน-เจือ อนุสรณ์ 2 ถ.สุขุมวิท 70/3 เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0102",
        "name": "อ.สมภูมิ ศรีบุญงาม",
        "status": "retired",
        "phone": "08 1267 5169",
        "address": "7/95 ซ.บุญศิริ ถ.สุขุมวิท ต.บางเมือง อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0103",
        "name": "อ.สังวาลย์ สันติเพชร",
        "status": "retired",
        "phone": "0 2951 2896 / 06 2521 7910 / 0 3576 0251",
        "address": "120 ซ.ติวานนท์ 41 แขวงท่าทราย อ.เมือง จ.นนทบุรี 11000",
        "notes": "-"
    },
    {
        "id": "A0104",
        "name": "ผอ.สำลี บุษสาย",
        "status": "deceased",
        "phone": "0 2241 1453",
        "address": "1418/16 ถ.นครชัยศรี เขตดุสิต กรุงเทพฯ 10300",
        "notes": "-"
    },
    {
        "id": "A0105",
        "name": "อ.สินี วิจารณ์",
        "status": "retired",
        "phone": "0 2398 5327 / 09 5735 9696",
        "address": "1038 ซ.สุขุมวิท 107 (แบริ่ง 34) ม.2 ถ.สุขุมวิท ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0106",
        "name": "อ.สุจินดา นิลคง",
        "status": "retired",
        "phone": "08 6063 2851",
        "address": "4/558 ถ.เสรีไทย 57 แขวงคลองกุ่ม เขตบึงกุ่ม กรุงเทพฯ 10240",
        "notes": "-"
    },
    {
        "id": "A0107",
        "name": "อ.สุจินต์ คุปรัตน์",
        "status": "retired",
        "phone": "0 2940 9730 / 08 1348 4440",
        "address": "32/9 แยก 2 ซ.วิภาวดี 58 ถ.วิภาวดี แขวงตลาดบางเขน เขตหลักสี่ กรุงเทพฯ 10210",
        "notes": "-"
    },
    {
        "id": "A0108",
        "name": "อ.สุชิน ตัญธนาวิทย์",
        "status": "retired",
        "phone": "0 2424 8987 / 08 5166 7080",
        "address": "30 ซอย 59 ถ.จรัญสนิทวงศ์ เขตบางกอกน้อย กรุงเทพฯ 10700",
        "notes": "-"
    },
    {
        "id": "A0109",
        "name": "อ.สุดาทิพ แดงค้ำคุณ",
        "status": "retired",
        "phone": "08 5920 8182",
        "address": "99/600 ซอย B 4 หมู่บ้านเอโทลมัลดีฟส์บีช ม.2 ถ.หนามแดง-บางพลี ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540",
        "notes": "-"
    },
    {
        "id": "A0110",
        "name": "อ.สุทัศน์ ลีลาวุฒิกูลรังสี",
        "status": "deceased",
        "phone": "0 2286 0446 / 08 1615 1841",
        "address": "90 ถ.นราธิวาสราชนครินทร์ ซอย 6 แขวงสาทร เขตสาทร กรุงเทพฯ 10120",
        "notes": "-"
    },
    {
        "id": "A0111",
        "name": "อ.สุนันทา นันทมนตรี",
        "status": "retired",
        "phone": "08 9154 3836",
        "address": "229/181 ซ.ร่มเกล้า 15 แขวงแสนแสบ เขตมีนบุรี กรุงเทพฯ 10510",
        "notes": "-"
    },
    {
        "id": "A0112",
        "name": "อ.สุนี ครุฑพันธุ์",
        "status": "deceased",
        "phone": "0 2377 7523 / 0 2375 9052 / 09 4912 1224",
        "address": "622 ซอย 24 (การเคหะ) ถ.นวมินทร์ 12 แขวงคลองจั่น เขตบางกะปิ กรุงเทพฯ 10240",
        "notes": "-"
    },
    {
        "id": "A0113",
        "name": "อ.สุพัฒน์เสฏฐ์ พสุธาธรรม",
        "status": "retired",
        "phone": "0 2398 6268",
        "address": "112/160 ซอย 46 ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0114",
        "name": "อ.สุภางค์พรรณ พงศ์สุวรรณ",
        "status": "retired",
        "phone": "0 2361 7454 / 08 4005 7535",
        "address": "1558 หมู่บ้านไพโรจน์ โครงการ 5 ซอย 3 ถ.บางนา-ตราด 27 เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0115",
        "name": "พลอาการศตรีสุรพันธ์ ทองคำเภา",
        "status": "retired",
        "phone": "0 2538 4774 / 08 1988 3270",
        "address": "1263 ไทยศิริพิเศษ ลาดพร้าว 94 แขวงพลับพลา เขตวังทองหลาง กรุงเทพฯ 10310",
        "notes": "ชื่อเล่น: ตุ๋ย"
    },
    {
        "id": "A0116",
        "name": "อ.สุรัตน์ ภู่พงศ์สกุล",
        "status": "retired",
        "phone": "08 9220 3544",
        "address": "70 ซ.สาทร 15 ถ.สาทรใต้ แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120",
        "notes": "-"
    },
    {
        "id": "A0117",
        "name": "อ.สุรีย์ ศรีมงคล",
        "status": "retired",
        "phone": "08 9690 9625",
        "address": "6/120 หมู่บ้านบางกอกบูเลอวาร์ดพระรามเก้า ศรีนครินทร์ ถ.กรุงเทพกรีฑา แขวงทับช้าง เขตสะพานสูง กรุงเทพฯ",
        "notes": "-"
    },
    {
        "id": "A0118",
        "name": "ผอ.สุวิทย์ชัย ชมพูพงษ์เกษม",
        "status": "retired",
        "phone": "0 2743 7046 / 08 5022 2809",
        "address": "33 รัตนทิพย์ อพาร์ทเม้นท์ ซ.อุดมสุข 18 แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0119",
        "name": "ผอ.เสมอ เหมพงศ์พันธุ์",
        "status": "retired",
        "phone": "0 2396 0599 / 08 1629 3838",
        "address": "213 หมู่บ้านไพโรจน์ ถ.บางนา-ตราด บางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0120",
        "name": "อ.อนุจิตร จอนจำรัส",
        "status": "deceased",
        "phone": "0 2411 2731 / 08 9201 1446",
        "address": "177 ซ.จรัญสนิทวงศ์ 27 ถ.จรัญสนิทวงศ์ แขวงบางขุนศรี เขตบางกอกน้อย กรุงเทพฯ 10700",
        "notes": "-"
    },
    {
        "id": "A0121",
        "name": "อ.อรุณี รัตนวิจารณ์",
        "status": "retired",
        "phone": "0 2377 7952 / 08 1859 1540",
        "address": "80 ซ.รามคำแหง 46 ถ.รามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",
        "notes": "-"
    },
    {
        "id": "A0122",
        "name": "อ.อังคณา กรรณสูต",
        "status": "retired",
        "phone": "08 6705 9735",
        "address": "86 ซ.พึ่งมี 9 แยก 2 ถ.สุขุมวิท 93 บางจาก พระโขนง กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0123",
        "name": "อ.อังคณา สุนทรสีมะ",
        "status": "retired",
        "phone": "0 2745 2953 / 08 7910 4497",
        "address": "160/25 ซ.จ่าโสด หมู่บ้านชวนชม ถ.สรรพาวุธ แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0124",
        "name": "อ.อัจฉรา พงศ์บุญชู",
        "status": "retired",
        "phone": "08 6978 6464",
        "address": "55 ถ.แปลงนาม แขวงสัมพันธวงศ์ เขตสัมพันธวงศ์ กรุงเทพฯ 10100",
        "notes": "-"
    },
    {
        "id": "A0125",
        "name": "อ.อัชฌาดา พุทธบูชา",
        "status": "retired",
        "phone": "0 2399 2092 / 08 2793 5665",
        "address": "2 ซ.บางนาตราด 10 ถ.บางนา-ตราด เขตบางนา กรุงเทพฯ 10260",
        "notes": "-"
    },
    {
        "id": "A0126",
        "name": "อ.อัญชลี เลาหเลิศชัย",
        "status": "retired",
        "phone": "08 9112 0692",
        "address": "29/1 หมู่บ้านธนาคารกรุงเทพ ถ.เฉลิมพระเกียรติ ร.9 ซ.9 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250",
        "notes": "-"
    },
    {
        "id": "A0127",
        "name": "อ.อารีย์ ลิ่มทอง",
        "status": "retired",
        "phone": "08 1702 4081",
        "address": "69/78 ซ.ราชพฤกษ์ 9 แขวงบางเชือกหนัง เขตตลิ่งชัน กรุงเทพฯ 10170",
        "notes": "-"
    },
    {
        "id": "A0128",
        "name": "อ.อิงพร พุ่มดอกไม้",
        "status": "retired",
        "phone": "0 2192 5753 / 08 1346 1478",
        "address": "99/53 หมู่บ้านคาซ่าวิล ถ.สุขาภิบาล 5 แขวงออเงิน เขตสายไหม กรุงเทพฯ 10220",
        "notes": "-"
    },
    {
        "id": "A0129",
        "name": "อ.อุทัยวรรณ สุประดิษฐ์",
        "status": "retired",
        "phone": "08 1261 7493 / 08 1667 3861",
        "address": "99/64 ม.6 หมู่บ้านเด่นชัย บางเมือง ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270",
        "notes": "-"
    },
    {
        "id": "A0130",
        "name": "อ.ชม ทองสุข",
        "status": "deceased",
        "phone": "-",
        "address": "-",
        "notes": "-"
    },
    {
        "id": "A0131",
        "name": "อ.ธีรวัฒน์ แย้มเพียร",
        "status": "deceased",
        "phone": "-",
        "address": "-",
        "notes": "-"
    },
    {
        "id": "A0132",
        "name": "รอง ผอ.บุญชัย รัตนกังวานวงศ์",
        "status": "deceased",
        "phone": "-",
        "address": "-",
        "notes": "-"
    },
    {
        "id": "A0133",
        "name": "อ.กิตติพัฒน์ สัมมาพาณิชกุล",
        "status": "deceased",
        "phone": "-",
        "address": "-",
        "notes": "-"
    },
    {
        "id": "A0134",
        "name": "อ.สุภาพ เถื่อนเมือง",
        "status": "retired",
        "phone": "-",
        "address": "-",
        "notes": "-"
    },
    {
        "id": "A0135",
        "name": "อ.ประภาส ขวัญเรียง",
        "status": "retired",
        "phone": "06 5091 6553",
        "address": "-",
        "notes": "-"
    }
];

// ประวัติการชำระค่าบำรุง (ชำระ 300 บาท/ปี)
const INITIAL_FEES = [
    {
        "id": "F001",
        "memberId": "01083",
        "paymentDate": "2021-01-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F002",
        "memberId": "01083",
        "paymentDate": "2021-01-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F003",
        "memberId": "01083",
        "paymentDate": "2022-01-07",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F004",
        "memberId": "01083",
        "paymentDate": "2023-01-12",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F005",
        "memberId": "01083",
        "paymentDate": "2024-01-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F006",
        "memberId": "01083",
        "paymentDate": "2025-01-30",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F007",
        "memberId": "03003",
        "paymentDate": "2021-02-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F008",
        "memberId": "03003",
        "paymentDate": "2021-02-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F009",
        "memberId": "07001",
        "paymentDate": "2021-05-01",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F010",
        "memberId": "07001",
        "paymentDate": "2021-05-01",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F011",
        "memberId": "07001",
        "paymentDate": "2022-01-07",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F012",
        "memberId": "07001",
        "paymentDate": "2023-01-04",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F013",
        "memberId": "07001",
        "paymentDate": "2024-01-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F014",
        "memberId": "07001",
        "paymentDate": "2025-01-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F015",
        "memberId": "07001",
        "paymentDate": "2026-01-06",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F016",
        "memberId": "02004",
        "paymentDate": "2020-12-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F017",
        "memberId": "02004",
        "paymentDate": "2020-12-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F018",
        "memberId": "02004",
        "paymentDate": "2021-12-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F019",
        "memberId": "02004",
        "paymentDate": "2022-11-30",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F020",
        "memberId": "02004",
        "paymentDate": "2023-12-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F021",
        "memberId": "02004",
        "paymentDate": "2025-02-02",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F022",
        "memberId": "02004",
        "paymentDate": "2025-12-01",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F023",
        "memberId": "01084",
        "paymentDate": "2021-02-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F024",
        "memberId": "01084",
        "paymentDate": "2021-02-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F025",
        "memberId": "01084",
        "paymentDate": "2021-02-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F026",
        "memberId": "01084",
        "paymentDate": "2023-01-19",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F027",
        "memberId": "01084",
        "paymentDate": "2024-01-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F028",
        "memberId": "07002",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F029",
        "memberId": "07002",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F030",
        "memberId": "07002",
        "paymentDate": "2022-01-20",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F031",
        "memberId": "07002",
        "paymentDate": "2024-06-15",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F032",
        "memberId": "07002",
        "paymentDate": "2025-07-19",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F033",
        "memberId": "07002",
        "paymentDate": "2026-06-12",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F034",
        "memberId": "04001",
        "paymentDate": "2021-03-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F035",
        "memberId": "04001",
        "paymentDate": "2021-03-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F036",
        "memberId": "04001",
        "paymentDate": "2022-01-07",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F037",
        "memberId": "04001",
        "paymentDate": "2023-01-12",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F038",
        "memberId": "04001",
        "paymentDate": "2024-01-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F039",
        "memberId": "04001",
        "paymentDate": "2025-01-31",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F040",
        "memberId": "04001",
        "paymentDate": "2026-04-02",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F041",
        "memberId": "12003",
        "paymentDate": "2021-08-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F042",
        "memberId": "01122",
        "paymentDate": "2021-02-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F043",
        "memberId": "01122",
        "paymentDate": "2021-02-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F044",
        "memberId": "01122",
        "paymentDate": "2022-01-08",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F045",
        "memberId": "01122",
        "paymentDate": "2023-01-22",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F046",
        "memberId": "01122",
        "paymentDate": "2024-01-12",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F047",
        "memberId": "01122",
        "paymentDate": "2025-01-31",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F048",
        "memberId": "05001",
        "paymentDate": "2021-02-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F049",
        "memberId": "05001",
        "paymentDate": "2021-02-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F050",
        "memberId": "05001",
        "paymentDate": "2022-03-07",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F051",
        "memberId": "05001",
        "paymentDate": "2023-02-05",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F052",
        "memberId": "07004",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F053",
        "memberId": "07004",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F054",
        "memberId": "07004",
        "paymentDate": "2022-03-31",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F055",
        "memberId": "07004",
        "paymentDate": "2024-06-09",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F056",
        "memberId": "07004",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F057",
        "memberId": "09001",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F058",
        "memberId": "09001",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F059",
        "memberId": "09001",
        "paymentDate": "2022-03-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F060",
        "memberId": "09001",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F061",
        "memberId": "01085",
        "paymentDate": "2021-01-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F062",
        "memberId": "01085",
        "paymentDate": "2021-01-02",
        "amount": 500,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F063",
        "memberId": "01085",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F064",
        "memberId": "01085",
        "paymentDate": "2023-02-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F065",
        "memberId": "01085",
        "paymentDate": "2024-03-19",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F066",
        "memberId": "01085",
        "paymentDate": "2025-03-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F067",
        "memberId": "01085",
        "paymentDate": "2026-02-05",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F068",
        "memberId": "02011",
        "paymentDate": "2021-02-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F069",
        "memberId": "02011",
        "paymentDate": "2021-02-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F070",
        "memberId": "02011",
        "paymentDate": "2021-08-26",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F071",
        "memberId": "02011",
        "paymentDate": "2024-03-19",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F072",
        "memberId": "02015",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F073",
        "memberId": "02015",
        "paymentDate": "2021-02-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F074",
        "memberId": "02015",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F075",
        "memberId": "02015",
        "paymentDate": "2023-03-01",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F076",
        "memberId": "02015",
        "paymentDate": "2024-03-02",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F077",
        "memberId": "02015",
        "paymentDate": "2025-03-04",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F078",
        "memberId": "02015",
        "paymentDate": "2026-02-13",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F079",
        "memberId": "01086",
        "paymentDate": "2021-03-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F080",
        "memberId": "01086",
        "paymentDate": "2021-03-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F081",
        "memberId": "01086",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F082",
        "memberId": "01087",
        "paymentDate": "2021-03-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F083",
        "memberId": "01087",
        "paymentDate": "2021-03-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F084",
        "memberId": "01087",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F085",
        "memberId": "01087",
        "paymentDate": "2024-05-22",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F086",
        "memberId": "01088",
        "paymentDate": "2021-08-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F087",
        "memberId": "01088",
        "paymentDate": "2021-08-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F088",
        "memberId": "01088",
        "paymentDate": "2022-12-03",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F089",
        "memberId": "01088",
        "paymentDate": "2023-02-06",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F090",
        "memberId": "01088",
        "paymentDate": "2024-02-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F091",
        "memberId": "01089",
        "paymentDate": "2021-06-04",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F092",
        "memberId": "01089",
        "paymentDate": "2020-11-12",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F093",
        "memberId": "01089",
        "paymentDate": "2021-06-04",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F094",
        "memberId": "03007",
        "paymentDate": "2021-05-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F095",
        "memberId": "03007",
        "paymentDate": "2021-05-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F096",
        "memberId": "03008",
        "paymentDate": "2021-02-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F097",
        "memberId": "03008",
        "paymentDate": "2021-02-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F098",
        "memberId": "01090",
        "paymentDate": "2021-11-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F099",
        "memberId": "01090",
        "paymentDate": "2021-11-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F100",
        "memberId": "01090",
        "paymentDate": "2022-03-20",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F101",
        "memberId": "01090",
        "paymentDate": "2023-03-13",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F102",
        "memberId": "01090",
        "paymentDate": "2024-03-12",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F103",
        "memberId": "01090",
        "paymentDate": "2025-03-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F104",
        "memberId": "05005",
        "paymentDate": "2021-03-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F105",
        "memberId": "05005",
        "paymentDate": "2021-03-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F106",
        "memberId": "05005",
        "paymentDate": "2022-03-13",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F107",
        "memberId": "01108",
        "paymentDate": "2021-11-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F108",
        "memberId": "01108",
        "paymentDate": "2021-11-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F109",
        "memberId": "01108",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F110",
        "memberId": "01108",
        "paymentDate": "2023-03-10",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F111",
        "memberId": "01108",
        "paymentDate": "2024-03-31",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F112",
        "memberId": "01108",
        "paymentDate": "2025-03-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F113",
        "memberId": "01108",
        "paymentDate": "2026-04-01",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F114",
        "memberId": "01114",
        "paymentDate": "2021-08-14",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F115",
        "memberId": "13011",
        "paymentDate": "2021-03-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F116",
        "memberId": "13011",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F117",
        "memberId": "13011",
        "paymentDate": "2023-03-10",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F118",
        "memberId": "01134",
        "paymentDate": "2021-03-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F119",
        "memberId": "01134",
        "paymentDate": "2022-03-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F120",
        "memberId": "01134",
        "paymentDate": "2023-03-10",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F121",
        "memberId": "01134",
        "paymentDate": "2024-03-31",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F122",
        "memberId": "01134",
        "paymentDate": "2025-03-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F123",
        "memberId": "01134",
        "paymentDate": "2026-04-01",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F124",
        "memberId": "03004",
        "paymentDate": "2024-03-28",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F125",
        "memberId": "05006",
        "paymentDate": "2021-04-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F126",
        "memberId": "05006",
        "paymentDate": "2021-04-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F127",
        "memberId": "05006",
        "paymentDate": "2022-04-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F128",
        "memberId": "05006",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F129",
        "memberId": "05006",
        "paymentDate": "2025-06-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F130",
        "memberId": "05006",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F131",
        "memberId": "01092",
        "paymentDate": "2021-04-14",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F132",
        "memberId": "01092",
        "paymentDate": "2021-04-14",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F133",
        "memberId": "01092",
        "paymentDate": "2021-04-14",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F134",
        "memberId": "01093",
        "paymentDate": "2021-05-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F135",
        "memberId": "01093",
        "paymentDate": "2021-05-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F136",
        "memberId": "01094",
        "paymentDate": "2021-04-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F137",
        "memberId": "01094",
        "paymentDate": "2021-04-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F138",
        "memberId": "01094",
        "paymentDate": "2022-04-25",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F139",
        "memberId": "01094",
        "paymentDate": "2023-04-21",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F140",
        "memberId": "01094",
        "paymentDate": "2024-04-22",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F141",
        "memberId": "01094",
        "paymentDate": "2025-04-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F142",
        "memberId": "01094",
        "paymentDate": "2026-04-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F143",
        "memberId": "28001",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F144",
        "memberId": "28001",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F145",
        "memberId": "01095",
        "paymentDate": "2020-07-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F146",
        "memberId": "01095",
        "paymentDate": "2020-07-25",
        "amount": 500,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F147",
        "memberId": "01095",
        "paymentDate": "2020-07-25",
        "amount": 500,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F148",
        "memberId": "01095",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F149",
        "memberId": "01095",
        "paymentDate": "2023-05-20",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F150",
        "memberId": "01095",
        "paymentDate": "2023-05-20",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F151",
        "memberId": "01095",
        "paymentDate": "2026-05-11",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F152",
        "memberId": "01095",
        "paymentDate": "2026-05-11",
        "amount": 300,
        "year": 2027,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F153",
        "memberId": "01096",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F154",
        "memberId": "01096",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F155",
        "memberId": "01096",
        "paymentDate": "2022-09-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F156",
        "memberId": "01096",
        "paymentDate": "2023-05-20",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F157",
        "memberId": "01096",
        "paymentDate": "2024-05-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F158",
        "memberId": "01096",
        "paymentDate": "2025-05-26",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F159",
        "memberId": "01096",
        "paymentDate": "2026-05-11",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F160",
        "memberId": "01097",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F161",
        "memberId": "01097",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F162",
        "memberId": "01097",
        "paymentDate": "2022-09-16",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F163",
        "memberId": "01097",
        "paymentDate": "2023-05-25",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F164",
        "memberId": "01097",
        "paymentDate": "2024-05-25",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F165",
        "memberId": "01097",
        "paymentDate": "2025-05-26",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F166",
        "memberId": "01097",
        "paymentDate": "2026-05-12",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F167",
        "memberId": "06006",
        "paymentDate": "2021-05-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F168",
        "memberId": "06006",
        "paymentDate": "2021-05-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F169",
        "memberId": "06006",
        "paymentDate": "2024-05-28",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F170",
        "memberId": "06007",
        "paymentDate": "2021-05-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F171",
        "memberId": "06007",
        "paymentDate": "2021-05-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F172",
        "memberId": "01100",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F173",
        "memberId": "01100",
        "paymentDate": "2021-05-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F174",
        "memberId": "01100",
        "paymentDate": "2023-05-25",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F175",
        "memberId": "01100",
        "paymentDate": "2024-05-25",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F176",
        "memberId": "04003",
        "paymentDate": "2021-05-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F177",
        "memberId": "01135",
        "paymentDate": "2021-05-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F178",
        "memberId": "01135",
        "paymentDate": "2023-04-09",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F179",
        "memberId": "01135",
        "paymentDate": "2024-05-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F180",
        "memberId": "01135",
        "paymentDate": "2025-05-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F181",
        "memberId": "01135",
        "paymentDate": "2026-05-21",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F182",
        "memberId": "01001",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F183",
        "memberId": "01001",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F184",
        "memberId": "01001",
        "paymentDate": "2022-06-17",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F185",
        "memberId": "01001",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F186",
        "memberId": "01001",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F187",
        "memberId": "01001",
        "paymentDate": "2025-06-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F188",
        "memberId": "01001",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F189",
        "memberId": "01004",
        "paymentDate": "2021-06-28",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F190",
        "memberId": "01004",
        "paymentDate": "2022-07-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F191",
        "memberId": "01004",
        "paymentDate": "2023-07-01",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F192",
        "memberId": "01006",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F193",
        "memberId": "01006",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F194",
        "memberId": "01006",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F195",
        "memberId": "01006",
        "paymentDate": "2023-06-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F196",
        "memberId": "01006",
        "paymentDate": "2024-06-09",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F197",
        "memberId": "01006",
        "paymentDate": "2025-07-01",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F198",
        "memberId": "01006",
        "paymentDate": "2026-06-05",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F199",
        "memberId": "01008",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F200",
        "memberId": "01008",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F201",
        "memberId": "01008",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F202",
        "memberId": "01008",
        "paymentDate": "2023-07-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F203",
        "memberId": "01008",
        "paymentDate": "2024-06-09",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F204",
        "memberId": "01008",
        "paymentDate": "2025-06-26",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F205",
        "memberId": "01009",
        "paymentDate": "2021-06-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F206",
        "memberId": "01009",
        "paymentDate": "2021-06-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F207",
        "memberId": "01009",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F208",
        "memberId": "01009",
        "paymentDate": "2023-06-27",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F209",
        "memberId": "01009",
        "paymentDate": "2024-06-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F210",
        "memberId": "01009",
        "paymentDate": "2025-07-04",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F211",
        "memberId": "01010",
        "paymentDate": "2021-04-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F212",
        "memberId": "01010",
        "paymentDate": "2021-04-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F213",
        "memberId": "01010",
        "paymentDate": "2022-07-02",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F214",
        "memberId": "01010",
        "paymentDate": "2024-06-15",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F215",
        "memberId": "01011",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F216",
        "memberId": "01011",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F217",
        "memberId": "01011",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F218",
        "memberId": "01011",
        "paymentDate": "2023-06-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F219",
        "memberId": "01011",
        "paymentDate": "2024-06-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F220",
        "memberId": "01011",
        "paymentDate": "2025-06-17",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F221",
        "memberId": "01011",
        "paymentDate": "2026-06-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F222",
        "memberId": "01013",
        "paymentDate": "2021-06-16",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F223",
        "memberId": "01013",
        "paymentDate": "2021-06-16",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F224",
        "memberId": "01013",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F225",
        "memberId": "01013",
        "paymentDate": "2023-06-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F226",
        "memberId": "01013",
        "paymentDate": "2024-06-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F227",
        "memberId": "01013",
        "paymentDate": "2025-06-19",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F228",
        "memberId": "01013",
        "paymentDate": "2026-06-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F229",
        "memberId": "01014",
        "paymentDate": "2021-02-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F230",
        "memberId": "01014",
        "paymentDate": "2021-02-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F231",
        "memberId": "01014",
        "paymentDate": "2022-07-04",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F232",
        "memberId": "01014",
        "paymentDate": "2023-07-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F233",
        "memberId": "01014",
        "paymentDate": "2024-05-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F234",
        "memberId": "01015",
        "paymentDate": "2021-06-16",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F235",
        "memberId": "01015",
        "paymentDate": "2021-06-16",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F236",
        "memberId": "01015",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F237",
        "memberId": "01015",
        "paymentDate": "2023-07-07",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F238",
        "memberId": "01015",
        "paymentDate": "2024-06-08",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F239",
        "memberId": "01017",
        "paymentDate": "2021-06-04",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F240",
        "memberId": "01017",
        "paymentDate": "2021-06-04",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F241",
        "memberId": "01017",
        "paymentDate": "2021-06-04",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F242",
        "memberId": "01017",
        "paymentDate": "2023-06-16",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F243",
        "memberId": "01017",
        "paymentDate": "2024-05-28",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F244",
        "memberId": "01017",
        "paymentDate": "2025-06-25",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F245",
        "memberId": "01017",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F246",
        "memberId": "01018",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F247",
        "memberId": "01018",
        "paymentDate": "2021-06-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F248",
        "memberId": "01018",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F249",
        "memberId": "01018",
        "paymentDate": "2023-06-21",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F250",
        "memberId": "01018",
        "paymentDate": "2024-06-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F251",
        "memberId": "01018",
        "paymentDate": "2025-06-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F252",
        "memberId": "01018",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F253",
        "memberId": "01019",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F254",
        "memberId": "01019",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F255",
        "memberId": "01019",
        "paymentDate": "2022-06-17",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F256",
        "memberId": "01019",
        "paymentDate": "2023-06-29",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F257",
        "memberId": "01019",
        "paymentDate": "2024-06-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F258",
        "memberId": "01019",
        "paymentDate": "2025-06-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F259",
        "memberId": "01019",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F260",
        "memberId": "01021",
        "paymentDate": "2021-03-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F261",
        "memberId": "01021",
        "paymentDate": "2021-03-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F262",
        "memberId": "01021",
        "paymentDate": "2022-06-29",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F263",
        "memberId": "01021",
        "paymentDate": "2023-07-08",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F264",
        "memberId": "01021",
        "paymentDate": "2024-06-09",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F265",
        "memberId": "01021",
        "paymentDate": "2025-06-21",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F266",
        "memberId": "01021",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F267",
        "memberId": "01021",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2027,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F268",
        "memberId": "01024",
        "paymentDate": "2021-06-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F269",
        "memberId": "01024",
        "paymentDate": "2021-06-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F270",
        "memberId": "01024",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F271",
        "memberId": "01024",
        "paymentDate": "2023-06-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F272",
        "memberId": "01024",
        "paymentDate": "2024-06-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F273",
        "memberId": "01024",
        "paymentDate": "2025-07-03",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F274",
        "memberId": "01024",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F275",
        "memberId": "01124",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F276",
        "memberId": "01124",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F277",
        "memberId": "01124",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F278",
        "memberId": "01124",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F279",
        "memberId": "01124",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F280",
        "memberId": "01124",
        "paymentDate": "2021-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F281",
        "memberId": "01124",
        "paymentDate": "2025-07-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F282",
        "memberId": "01124",
        "paymentDate": "2025-07-17",
        "amount": 300,
        "year": 2027,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F283",
        "memberId": "01124",
        "paymentDate": "2025-07-17",
        "amount": 300,
        "year": 2028,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F284",
        "memberId": "01124",
        "paymentDate": "2025-07-17",
        "amount": 300,
        "year": 2029,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F285",
        "memberId": "14010",
        "paymentDate": "2021-06-06",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F286",
        "memberId": "14010",
        "paymentDate": "2022-06-24",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F287",
        "memberId": "27001",
        "paymentDate": "2021-07-06",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F288",
        "memberId": "27001",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F289",
        "memberId": "27001",
        "paymentDate": "2024-06-17",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F290",
        "memberId": "27001",
        "paymentDate": "2025-06-19",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F291",
        "memberId": "27001",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F292",
        "memberId": "01027",
        "paymentDate": "2021-04-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F293",
        "memberId": "01027",
        "paymentDate": "2021-04-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F294",
        "memberId": "01028",
        "paymentDate": "2021-08-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F295",
        "memberId": "01028",
        "paymentDate": "2021-08-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F296",
        "memberId": "01028",
        "paymentDate": "2022-07-08",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F297",
        "memberId": "01028",
        "paymentDate": "2023-07-27",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F298",
        "memberId": "01030",
        "paymentDate": "2021-07-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F299",
        "memberId": "01030",
        "paymentDate": "2021-07-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F300",
        "memberId": "01030",
        "paymentDate": "2021-07-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F301",
        "memberId": "01037",
        "paymentDate": "2021-07-14",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F302",
        "memberId": "01037",
        "paymentDate": "2021-07-14",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F303",
        "memberId": "01037",
        "paymentDate": "2022-07-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F304",
        "memberId": "01037",
        "paymentDate": "2023-07-12",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F305",
        "memberId": "01037",
        "paymentDate": "2024-07-15",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F306",
        "memberId": "01037",
        "paymentDate": "2025-07-07",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F307",
        "memberId": "01038",
        "paymentDate": "2021-08-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F308",
        "memberId": "01038",
        "paymentDate": "2021-08-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F309",
        "memberId": "01039",
        "paymentDate": "2021-07-19",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F310",
        "memberId": "01039",
        "paymentDate": "2021-07-19",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F311",
        "memberId": "01039",
        "paymentDate": "2022-07-20",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F312",
        "memberId": "01039",
        "paymentDate": "2023-08-24",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F313",
        "memberId": "01040",
        "paymentDate": "2021-07-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F314",
        "memberId": "01040",
        "paymentDate": "2021-07-17",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F315",
        "memberId": "01040",
        "paymentDate": "2022-08-11",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F316",
        "memberId": "01040",
        "paymentDate": "2023-09-28",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F317",
        "memberId": "01041",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F318",
        "memberId": "01041",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F319",
        "memberId": "01041",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F320",
        "memberId": "01041",
        "paymentDate": "2023-07-27",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F321",
        "memberId": "01043",
        "paymentDate": "2021-07-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F322",
        "memberId": "01043",
        "paymentDate": "2021-07-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F323",
        "memberId": "01043",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F324",
        "memberId": "01043",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F325",
        "memberId": "01046",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F326",
        "memberId": "01046",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F327",
        "memberId": "01046",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F328",
        "memberId": "01046",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F329",
        "memberId": "01047",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F330",
        "memberId": "01047",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F331",
        "memberId": "01047",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F332",
        "memberId": "01047",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F333",
        "memberId": "01048",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F334",
        "memberId": "01048",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F335",
        "memberId": "01048",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F336",
        "memberId": "01048",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F337",
        "memberId": "01049",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F338",
        "memberId": "01049",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F339",
        "memberId": "01050",
        "paymentDate": "2021-07-20",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F340",
        "memberId": "01050",
        "paymentDate": "2021-07-20",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F341",
        "memberId": "01050",
        "paymentDate": "2022-08-05",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F342",
        "memberId": "01050",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F343",
        "memberId": "01050",
        "paymentDate": "2024-07-25",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F344",
        "memberId": "01050",
        "paymentDate": "2025-07-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F345",
        "memberId": "01051",
        "paymentDate": "2021-07-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F346",
        "memberId": "01051",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F347",
        "memberId": "01051",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F348",
        "memberId": "01054",
        "paymentDate": "2021-08-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F349",
        "memberId": "01054",
        "paymentDate": "2021-08-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F350",
        "memberId": "01054",
        "paymentDate": "2022-07-19",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F351",
        "memberId": "01054",
        "paymentDate": "2023-07-27",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F352",
        "memberId": "01058",
        "paymentDate": "2021-08-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F353",
        "memberId": "01058",
        "paymentDate": "2021-08-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F354",
        "memberId": "01058",
        "paymentDate": "2022-07-17",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F355",
        "memberId": "01059",
        "paymentDate": "2021-07-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F356",
        "memberId": "01059",
        "paymentDate": "2022-07-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F357",
        "memberId": "01059",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F358",
        "memberId": "01061",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F359",
        "memberId": "01061",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F360",
        "memberId": "01061",
        "paymentDate": "2022-07-05",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F361",
        "memberId": "01061",
        "paymentDate": "2023-07-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F362",
        "memberId": "01071",
        "paymentDate": "2021-07-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F363",
        "memberId": "01071",
        "paymentDate": "2022-07-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F364",
        "memberId": "01103",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F365",
        "memberId": "01103",
        "paymentDate": "2021-06-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F366",
        "memberId": "01103",
        "paymentDate": "2022-07-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F367",
        "memberId": "01115",
        "paymentDate": "2021-09-22",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F368",
        "memberId": "01115",
        "paymentDate": "2021-09-22",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F369",
        "memberId": "01115",
        "paymentDate": "2022-07-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F370",
        "memberId": "01115",
        "paymentDate": "2023-07-27",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F371",
        "memberId": "04002",
        "paymentDate": "2021-08-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F372",
        "memberId": "04002",
        "paymentDate": "2021-08-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F373",
        "memberId": "04002",
        "paymentDate": "2022-07-08",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F374",
        "memberId": "04002",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F375",
        "memberId": "04002",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F376",
        "memberId": "01125",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F377",
        "memberId": "01125",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F378",
        "memberId": "01125",
        "paymentDate": "2022-07-19",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F379",
        "memberId": "01125",
        "paymentDate": "2023-07-25",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F380",
        "memberId": "01125",
        "paymentDate": "2024-07-03",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F381",
        "memberId": "01125",
        "paymentDate": "2025-07-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F382",
        "memberId": "01126",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F383",
        "memberId": "01126",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F384",
        "memberId": "01126",
        "paymentDate": "2022-07-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F385",
        "memberId": "01126",
        "paymentDate": "2026-06-18",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F386",
        "memberId": "01127",
        "paymentDate": "2021-02-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F387",
        "memberId": "01127",
        "paymentDate": "2021-02-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F388",
        "memberId": "01127",
        "paymentDate": "2022-07-19",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F389",
        "memberId": "01127",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F390",
        "memberId": "01127",
        "paymentDate": "2024-07-03",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F391",
        "memberId": "01127",
        "paymentDate": "2025-07-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F392",
        "memberId": "01128",
        "paymentDate": "2021-07-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F393",
        "memberId": "01128",
        "paymentDate": "2021-07-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F394",
        "memberId": "01128",
        "paymentDate": "2022-07-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F395",
        "memberId": "01128",
        "paymentDate": "2023-07-25",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F396",
        "memberId": "01128",
        "paymentDate": "2024-07-16",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F397",
        "memberId": "01128",
        "paymentDate": "2025-07-22",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F398",
        "memberId": "01129",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F399",
        "memberId": "01129",
        "paymentDate": "2021-01-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F400",
        "memberId": "01129",
        "paymentDate": "2022-07-22",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F401",
        "memberId": "01129",
        "paymentDate": "2023-07-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F402",
        "memberId": "01129",
        "paymentDate": "2024-07-23",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F403",
        "memberId": "01129",
        "paymentDate": "2025-07-11",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F404",
        "memberId": "09006",
        "paymentDate": "2021-08-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F405",
        "memberId": "09006",
        "paymentDate": "2022-11-29",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F406",
        "memberId": "09006",
        "paymentDate": "2023-06-19",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F407",
        "memberId": "09006",
        "paymentDate": "2025-06-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F408",
        "memberId": "01136",
        "paymentDate": "2021-07-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F409",
        "memberId": "01070",
        "paymentDate": "2021-07-31",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F410",
        "memberId": "01070",
        "paymentDate": "2021-07-31",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F411",
        "memberId": "01070",
        "paymentDate": "2022-08-16",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F412",
        "memberId": "01070",
        "paymentDate": "2023-08-07",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F413",
        "memberId": "01079",
        "paymentDate": "2021-08-28",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F414",
        "memberId": "01079",
        "paymentDate": "2022-08-08",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F415",
        "memberId": "01079",
        "paymentDate": "2023-08-31",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F416",
        "memberId": "01079",
        "paymentDate": "2024-08-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F417",
        "memberId": "01079",
        "paymentDate": "2025-08-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F418",
        "memberId": "07007",
        "paymentDate": "2021-08-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F419",
        "memberId": "13002",
        "paymentDate": "2021-09-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F420",
        "memberId": "13002",
        "paymentDate": "2021-08-02",
        "amount": 500,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F421",
        "memberId": "13002",
        "paymentDate": "2021-09-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F422",
        "memberId": "13002",
        "paymentDate": "2022-08-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F423",
        "memberId": "13002",
        "paymentDate": "2023-08-09",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F424",
        "memberId": "13002",
        "paymentDate": "2024-08-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F425",
        "memberId": "13002",
        "paymentDate": "2025-08-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F426",
        "memberId": "07017",
        "paymentDate": "2021-08-18",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F427",
        "memberId": "07017",
        "paymentDate": "2021-08-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F428",
        "memberId": "07017",
        "paymentDate": "2023-08-18",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F429",
        "memberId": "07017",
        "paymentDate": "2024-08-17",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F430",
        "memberId": "07017",
        "paymentDate": "2025-08-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F431",
        "memberId": "09009",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F432",
        "memberId": "09009",
        "paymentDate": "2024-06-17",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F433",
        "memberId": "09009",
        "paymentDate": "2025-06-19",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F434",
        "memberId": "01116",
        "paymentDate": "2021-08-18",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F435",
        "memberId": "01116",
        "paymentDate": "2021-08-18",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F436",
        "memberId": "01116",
        "paymentDate": "2022-08-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F437",
        "memberId": "01116",
        "paymentDate": "2023-10-04",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F438",
        "memberId": "01116",
        "paymentDate": "2023-10-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F439",
        "memberId": "01116",
        "paymentDate": "2025-08-31",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F440",
        "memberId": "01117",
        "paymentDate": "2021-08-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F441",
        "memberId": "01117",
        "paymentDate": "2021-08-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F442",
        "memberId": "01117",
        "paymentDate": "2022-08-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F443",
        "memberId": "01117",
        "paymentDate": "2023-08-08",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F444",
        "memberId": "01117",
        "paymentDate": "2024-08-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F445",
        "memberId": "01117",
        "paymentDate": "2025-08-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F446",
        "memberId": "01137",
        "paymentDate": "2021-08-24",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F447",
        "memberId": "09003",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F448",
        "memberId": "09003",
        "paymentDate": "2022-08-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F449",
        "memberId": "09003",
        "paymentDate": "2023-08-09",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F450",
        "memberId": "09003",
        "paymentDate": "2024-08-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F451",
        "memberId": "09003",
        "paymentDate": "2025-08-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F452",
        "memberId": "09007",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F453",
        "memberId": "09007",
        "paymentDate": "2022-08-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F454",
        "memberId": "09007",
        "paymentDate": "2023-08-12",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F455",
        "memberId": "09008",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F456",
        "memberId": "09008",
        "paymentDate": "2022-08-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F457",
        "memberId": "09008",
        "paymentDate": "2023-08-17",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F458",
        "memberId": "09010",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F459",
        "memberId": "01060",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F460",
        "memberId": "01060",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F461",
        "memberId": "13001",
        "paymentDate": "2021-09-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F462",
        "memberId": "13001",
        "paymentDate": "2022-09-11",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F463",
        "memberId": "13001",
        "paymentDate": "2023-10-07",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F464",
        "memberId": "13001",
        "paymentDate": "2024-09-19",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F465",
        "memberId": "13001",
        "paymentDate": "2025-10-02",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F466",
        "memberId": "07003",
        "paymentDate": "2021-09-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F467",
        "memberId": "02014",
        "paymentDate": "2021-09-28",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F468",
        "memberId": "10001",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F469",
        "memberId": "10001",
        "paymentDate": "2024-08-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F470",
        "memberId": "10001",
        "paymentDate": "2025-05-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F471",
        "memberId": "13005",
        "paymentDate": "2021-09-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F472",
        "memberId": "01104",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F473",
        "memberId": "01105",
        "paymentDate": "2021-09-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F474",
        "memberId": "01105",
        "paymentDate": "2022-09-09",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F475",
        "memberId": "01106",
        "paymentDate": "2021-09-05",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F476",
        "memberId": "16004",
        "paymentDate": "2021-09-12",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F477",
        "memberId": "01118",
        "paymentDate": "2020-07-26",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F478",
        "memberId": "01118",
        "paymentDate": "2020-07-26",
        "amount": 500,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F479",
        "memberId": "01118",
        "paymentDate": "2020-07-26",
        "amount": 500,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F480",
        "memberId": "01118",
        "paymentDate": "2021-09-06",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F481",
        "memberId": "01118",
        "paymentDate": "2023-09-04",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F482",
        "memberId": "01119",
        "paymentDate": "2021-09-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F483",
        "memberId": "01120",
        "paymentDate": "2021-08-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F484",
        "memberId": "01120",
        "paymentDate": "2020-09-25",
        "amount": 500,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F485",
        "memberId": "01120",
        "paymentDate": "2021-08-25",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F486",
        "memberId": "01120",
        "paymentDate": "2022-09-26",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F487",
        "memberId": "01131",
        "paymentDate": "2021-09-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F488",
        "memberId": "01131",
        "paymentDate": "2021-09-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F489",
        "memberId": "01131",
        "paymentDate": "2022-10-04",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F490",
        "memberId": "01131",
        "paymentDate": "2023-10-07",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F491",
        "memberId": "01082",
        "paymentDate": "2020-06-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F492",
        "memberId": "01082",
        "paymentDate": "2020-06-11",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F493",
        "memberId": "01082",
        "paymentDate": "2021-10-06",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F494",
        "memberId": "01082",
        "paymentDate": "2022-10-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F495",
        "memberId": "01082",
        "paymentDate": "2023-10-09",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F496",
        "memberId": "01082",
        "paymentDate": "2024-10-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F497",
        "memberId": "01082",
        "paymentDate": "2025-10-06",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F498",
        "memberId": "19002",
        "paymentDate": "2021-06-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F499",
        "memberId": "19002",
        "paymentDate": "2021-06-23",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F500",
        "memberId": "19002",
        "paymentDate": "2021-06-23",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F501",
        "memberId": "19002",
        "paymentDate": "2022-10-05",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F502",
        "memberId": "19002",
        "paymentDate": "2023-10-02",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F503",
        "memberId": "19002",
        "paymentDate": "2024-10-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F504",
        "memberId": "19002",
        "paymentDate": "2025-10-13",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F505",
        "memberId": "09005",
        "paymentDate": "2021-10-18",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F506",
        "memberId": "09005",
        "paymentDate": "2022-10-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F507",
        "memberId": "09005",
        "paymentDate": "2023-10-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F508",
        "memberId": "09005",
        "paymentDate": "2024-10-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F509",
        "memberId": "09005",
        "paymentDate": "2025-10-27",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F510",
        "memberId": "01132",
        "paymentDate": "2020-10-02",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F511",
        "memberId": "01132",
        "paymentDate": "2020-10-02",
        "amount": 500,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F512",
        "memberId": "01132",
        "paymentDate": "2020-10-02",
        "amount": 500,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F513",
        "memberId": "01133",
        "paymentDate": "2020-10-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F514",
        "memberId": "01133",
        "paymentDate": "2020-10-30",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F515",
        "memberId": "01133",
        "paymentDate": "2020-10-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F516",
        "memberId": "01133",
        "paymentDate": "2022-10-16",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F517",
        "memberId": "01133",
        "paymentDate": "2023-10-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F518",
        "memberId": "01133",
        "paymentDate": "2025-01-10",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F519",
        "memberId": "01133",
        "paymentDate": "2025-11-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F520",
        "memberId": "14006",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F521",
        "memberId": "14006",
        "paymentDate": "2022-11-01",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F522",
        "memberId": "07018",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F523",
        "memberId": "07018",
        "paymentDate": "2021-08-27",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F524",
        "memberId": "07018",
        "paymentDate": "2023-06-16",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F525",
        "memberId": "07018",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F526",
        "memberId": "07018",
        "paymentDate": "2025-06-17",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F527",
        "memberId": "07018",
        "paymentDate": "2025-06-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F528",
        "memberId": "07018",
        "paymentDate": "2026-01-11",
        "amount": 300,
        "year": 2027,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F529",
        "memberId": "07018",
        "paymentDate": "2026-01-11",
        "amount": 300,
        "year": 2028,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F530",
        "memberId": "07018",
        "paymentDate": "2026-01-11",
        "amount": 300,
        "year": 2029,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F531",
        "memberId": "09010",
        "paymentDate": "2021-09-06",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F532",
        "memberId": "09010",
        "paymentDate": "2025-09-03",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F533",
        "memberId": "11002",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F534",
        "memberId": "28002",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F535",
        "memberId": "28002",
        "paymentDate": "2026-04-02",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F536",
        "memberId": "09011",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F537",
        "memberId": "09011",
        "paymentDate": "2024-06-28",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F538",
        "memberId": "09011",
        "paymentDate": "2025-06-22",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F539",
        "memberId": "19003",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F540",
        "memberId": "19003",
        "paymentDate": "2022-09-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F541",
        "memberId": "38001",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F542",
        "memberId": "34001",
        "paymentDate": "2021-09-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F543",
        "memberId": "35001",
        "paymentDate": "2021-09-09",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F544",
        "memberId": "35001",
        "paymentDate": "2025-05-07",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F545",
        "memberId": "35001",
        "paymentDate": "2025-05-07",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F546",
        "memberId": "35001",
        "paymentDate": "2025-05-07",
        "amount": 300,
        "year": 2027,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F547",
        "memberId": "35001",
        "paymentDate": "2025-05-07",
        "amount": 300,
        "year": 2028,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F548",
        "memberId": "23001",
        "paymentDate": "2021-09-09",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F549",
        "memberId": "23001",
        "paymentDate": "2025-05-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F550",
        "memberId": "23001",
        "paymentDate": "2025-10-29",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F551",
        "memberId": "34002",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F552",
        "memberId": "32001",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F553",
        "memberId": "32001",
        "paymentDate": "2025-06-30",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F554",
        "memberId": "04004",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F555",
        "memberId": "04004",
        "paymentDate": "2022-09-22",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F556",
        "memberId": "04004",
        "paymentDate": "2024-06-26",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F557",
        "memberId": "04004",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F558",
        "memberId": "09012",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F559",
        "memberId": "09012",
        "paymentDate": "2023-10-09",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F560",
        "memberId": "09012",
        "paymentDate": "2024-11-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F561",
        "memberId": "09012",
        "paymentDate": "2025-10-31",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F562",
        "memberId": "06009",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F563",
        "memberId": "06009",
        "paymentDate": "2022-09-08",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F564",
        "memberId": "06009",
        "paymentDate": "2023-05-27",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F565",
        "memberId": "06009",
        "paymentDate": "2024-09-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F566",
        "memberId": "06009",
        "paymentDate": "2025-08-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F567",
        "memberId": "06009",
        "paymentDate": "2026-06-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F568",
        "memberId": "28003",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F569",
        "memberId": "28003",
        "paymentDate": "2025-05-06",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F570",
        "memberId": "28003",
        "paymentDate": "2026-05-25",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F571",
        "memberId": "13013",
        "paymentDate": "2021-09-12",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F572",
        "memberId": "13013",
        "paymentDate": "2024-08-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F573",
        "memberId": "15001",
        "paymentDate": "2021-09-12",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F574",
        "memberId": "14011",
        "paymentDate": "2021-09-12",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F575",
        "memberId": "01138",
        "paymentDate": "2021-09-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F576",
        "memberId": "01139",
        "paymentDate": "2021-09-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F577",
        "memberId": "06010",
        "paymentDate": "2021-09-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F578",
        "memberId": "06010",
        "paymentDate": "2022-10-05",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F579",
        "memberId": "06010",
        "paymentDate": "2023-09-06",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F580",
        "memberId": "06010",
        "paymentDate": "2024-09-12",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F581",
        "memberId": "06010",
        "paymentDate": "2025-09-07",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F582",
        "memberId": "09018",
        "paymentDate": "2021-09-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F583",
        "memberId": "09018",
        "paymentDate": "2024-06-18",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F584",
        "memberId": "09018",
        "paymentDate": "2025-06-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F585",
        "memberId": "01140",
        "paymentDate": "2021-09-15",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F586",
        "memberId": "05007",
        "paymentDate": "2021-09-16",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F587",
        "memberId": "23002",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F588",
        "memberId": "29001",
        "paymentDate": "2021-09-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F589",
        "memberId": "29001",
        "paymentDate": "2022-11-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F590",
        "memberId": "29001",
        "paymentDate": "2024-08-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F591",
        "memberId": "29001",
        "paymentDate": "2025-08-11",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F592",
        "memberId": "02017",
        "paymentDate": "2021-09-21",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F593",
        "memberId": "24001",
        "paymentDate": "2021-09-22",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F594",
        "memberId": "02018",
        "paymentDate": "2021-09-29",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F595",
        "memberId": "07019",
        "paymentDate": "2021-09-29",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F596",
        "memberId": "01141",
        "paymentDate": "2021-09-30",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F597",
        "memberId": "17001",
        "paymentDate": "2021-10-13",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F598",
        "memberId": "18004",
        "paymentDate": "2021-11-03",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F599",
        "memberId": "03012",
        "paymentDate": "2021-11-06",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F600",
        "memberId": "03012",
        "paymentDate": "2022-11-01",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F601",
        "memberId": "03012",
        "paymentDate": "2024-06-26",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F602",
        "memberId": "03012",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F603",
        "memberId": "03012",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F604",
        "memberId": "14005",
        "paymentDate": "2020-02-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F605",
        "memberId": "14005",
        "paymentDate": "2020-02-11",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F606",
        "memberId": "14005",
        "paymentDate": "2021-11-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F607",
        "memberId": "14005",
        "paymentDate": "2022-11-17",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F608",
        "memberId": "14005",
        "paymentDate": "2023-10-18",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F609",
        "memberId": "14005",
        "paymentDate": "2024-10-25",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F610",
        "memberId": "14005",
        "paymentDate": "2025-11-02",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F611",
        "memberId": "10002",
        "paymentDate": "2023-10-04",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F612",
        "memberId": "10002",
        "paymentDate": "2024-10-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F613",
        "memberId": "10002",
        "paymentDate": "2025-10-29",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F614",
        "memberId": "01143",
        "paymentDate": "2023-10-08",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F615",
        "memberId": "01143",
        "paymentDate": "2024-10-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F616",
        "memberId": "01143",
        "paymentDate": "2026-02-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F617",
        "memberId": "06011",
        "paymentDate": "2021-11-10",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F618",
        "memberId": "19004",
        "paymentDate": "2021-11-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F619",
        "memberId": "19004",
        "paymentDate": "2022-09-11",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F620",
        "memberId": "19004",
        "paymentDate": "2023-11-07",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F621",
        "memberId": "19004",
        "paymentDate": "2024-11-10",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F622",
        "memberId": "19004",
        "paymentDate": "2025-11-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F623",
        "memberId": "05007",
        "paymentDate": "2021-11-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F624",
        "memberId": "05007",
        "paymentDate": "2024-06-26",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F625",
        "memberId": "05007",
        "paymentDate": "2025-06-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F626",
        "memberId": "05007",
        "paymentDate": "2026-06-18",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F627",
        "memberId": "09014",
        "paymentDate": "2021-11-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F628",
        "memberId": "06013",
        "paymentDate": "2022-11-30",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F629",
        "memberId": "06013",
        "paymentDate": "2023-11-04",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F630",
        "memberId": "06013",
        "paymentDate": "2024-11-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F631",
        "memberId": "06013",
        "paymentDate": "2025-11-11",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F632",
        "memberId": "06014",
        "paymentDate": "2022-11-30",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F633",
        "memberId": "06014",
        "paymentDate": "2023-11-05",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F634",
        "memberId": "06014",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F635",
        "memberId": "06014",
        "paymentDate": "2025-11-06",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F636",
        "memberId": "01142",
        "paymentDate": "2021-12-08",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F637",
        "memberId": "09017",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F638",
        "memberId": "09017",
        "paymentDate": "2023-06-12",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F639",
        "memberId": "09017",
        "paymentDate": "2024-06-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F640",
        "memberId": "09017",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F641",
        "memberId": "18005",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F642",
        "memberId": "06012",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F643",
        "memberId": "06012",
        "paymentDate": "2023-06-11",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F644",
        "memberId": "06012",
        "paymentDate": "2024-06-09",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F645",
        "memberId": "06012",
        "paymentDate": "2025-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F646",
        "memberId": "06012",
        "paymentDate": "2026-06-09",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F647",
        "memberId": "18006",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F648",
        "memberId": "18006",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F649",
        "memberId": "18006",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F650",
        "memberId": "18006",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F651",
        "memberId": "18006",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F652",
        "memberId": "19005",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F653",
        "memberId": "19005",
        "paymentDate": "2023-06-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F654",
        "memberId": "19005",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F655",
        "memberId": "19005",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F656",
        "memberId": "19005",
        "paymentDate": "2026-06-08",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F657",
        "memberId": "19006",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F658",
        "memberId": "19006",
        "paymentDate": "2023-06-11",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F659",
        "memberId": "19006",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F660",
        "memberId": "19006",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F661",
        "memberId": "19006",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F662",
        "memberId": "18007",
        "paymentDate": "2022-06-12",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F663",
        "memberId": "18008",
        "paymentDate": "2022-06-13",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F664",
        "memberId": "18008",
        "paymentDate": "2025-10-06",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F665",
        "memberId": "14012",
        "paymentDate": "2022-06-14",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F666",
        "memberId": "14013",
        "paymentDate": "2022-06-14",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F667",
        "memberId": "14013",
        "paymentDate": "2023-07-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F668",
        "memberId": "14013",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F669",
        "memberId": "14013",
        "paymentDate": "2025-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F670",
        "memberId": "14013",
        "paymentDate": "2026-06-18",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F671",
        "memberId": "18009",
        "paymentDate": "2022-06-14",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F672",
        "memberId": "18009",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F673",
        "memberId": "18009",
        "paymentDate": "2024-06-10",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F674",
        "memberId": "19007",
        "paymentDate": "2022-06-14",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F675",
        "memberId": "19007",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F676",
        "memberId": "19007",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F677",
        "memberId": "19007",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F678",
        "memberId": "19007",
        "paymentDate": "2026-06-09",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F679",
        "memberId": "18010",
        "paymentDate": "2022-06-14",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F680",
        "memberId": "18010",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F681",
        "memberId": "18010",
        "paymentDate": "2024-06-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F682",
        "memberId": "18010",
        "paymentDate": "2025-07-03",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F683",
        "memberId": "18010",
        "paymentDate": "2026-06-18",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F684",
        "memberId": "18011",
        "paymentDate": "2022-06-13",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F685",
        "memberId": "18011",
        "paymentDate": "2023-06-14",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F686",
        "memberId": "18011",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F687",
        "memberId": "18011",
        "paymentDate": "2025-07-21",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F688",
        "memberId": "18011",
        "paymentDate": "2026-06-15",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F689",
        "memberId": "19008",
        "paymentDate": "2022-06-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F690",
        "memberId": "19008",
        "paymentDate": "2023-10-02",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F691",
        "memberId": "19008",
        "paymentDate": "2024-06-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F692",
        "memberId": "19008",
        "paymentDate": "2025-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F693",
        "memberId": "19008",
        "paymentDate": "2026-06-09",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F694",
        "memberId": "19009",
        "paymentDate": "2022-06-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F695",
        "memberId": "19010",
        "paymentDate": "2022-06-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F696",
        "memberId": "42001",
        "paymentDate": "2022-06-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F697",
        "memberId": "42001",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F698",
        "memberId": "42001",
        "paymentDate": "2024-07-03",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F699",
        "memberId": "42001",
        "paymentDate": "2025-07-03",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F700",
        "memberId": "42001",
        "paymentDate": "2026-06-19",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F701",
        "memberId": "ส.17001",
        "paymentDate": "2022-06-15",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F702",
        "memberId": "18012",
        "paymentDate": "2022-06-16",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F703",
        "memberId": "18012",
        "paymentDate": "2023-07-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F704",
        "memberId": "18012",
        "paymentDate": "2024-06-15",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F705",
        "memberId": "18012",
        "paymentDate": "2025-06-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F706",
        "memberId": "18012",
        "paymentDate": "2026-06-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F707",
        "memberId": "18013",
        "paymentDate": "2022-06-16",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F708",
        "memberId": "18013",
        "paymentDate": "2023-07-03",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F709",
        "memberId": "07009",
        "paymentDate": "2022-06-17",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F710",
        "memberId": "07009",
        "paymentDate": "2023-11-25",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F711",
        "memberId": "ส.17002",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F712",
        "memberId": "ส.17002",
        "paymentDate": "2023-06-14",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F713",
        "memberId": "ส.17002",
        "paymentDate": "2024-06-05",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F714",
        "memberId": "ส.17003",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F715",
        "memberId": "ส.17003",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F716",
        "memberId": "ส.17003",
        "paymentDate": "2024-06-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F717",
        "memberId": "ส.17003",
        "paymentDate": "2025-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F718",
        "memberId": "ส.17003",
        "paymentDate": "2026-06-05",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F719",
        "memberId": "ส.17004",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F720",
        "memberId": "ส.17005",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F721",
        "memberId": "ส.17005",
        "paymentDate": "2023-06-14",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F722",
        "memberId": "ส.17006",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F723",
        "memberId": "ส.17006",
        "paymentDate": "2023-06-19",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F724",
        "memberId": "ส.17006",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F725",
        "memberId": "ส.17006",
        "paymentDate": "2025-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F726",
        "memberId": "ส.17006",
        "paymentDate": "2026-06-08",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F727",
        "memberId": "ส.17007",
        "paymentDate": "2022-06-18",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F728",
        "memberId": "ส.17007",
        "paymentDate": "2023-06-14",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F729",
        "memberId": "ส.17007",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F730",
        "memberId": "ส.17007",
        "paymentDate": "2025-07-03",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F731",
        "memberId": "ส.17007",
        "paymentDate": "2026-06-05",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F732",
        "memberId": "19011",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F733",
        "memberId": "19011",
        "paymentDate": "2023-06-26",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F734",
        "memberId": "19011",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F735",
        "memberId": "19011",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F736",
        "memberId": "19011",
        "paymentDate": "2026-06-08",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F737",
        "memberId": "ส.18001",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F738",
        "memberId": "ส.18001",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F739",
        "memberId": "ส.18001",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F740",
        "memberId": "ส.18001",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F741",
        "memberId": "19012",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F742",
        "memberId": "19012",
        "paymentDate": "2023-06-16",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F743",
        "memberId": "19012",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F744",
        "memberId": "19012",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F745",
        "memberId": "19012",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F746",
        "memberId": "19013",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F747",
        "memberId": "19013",
        "paymentDate": "2024-06-10",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F748",
        "memberId": "19013",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F749",
        "memberId": "19013",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F750",
        "memberId": "19014",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F751",
        "memberId": "19014",
        "paymentDate": "2024-07-29",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F752",
        "memberId": "19014",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F753",
        "memberId": "18014",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F754",
        "memberId": "18014",
        "paymentDate": "2023-06-15",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F755",
        "memberId": "18014",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F756",
        "memberId": "19015",
        "paymentDate": "2022-06-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F757",
        "memberId": "19015",
        "paymentDate": "2024-03-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F758",
        "memberId": "19015",
        "paymentDate": "2025-04-23",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F759",
        "memberId": "19015",
        "paymentDate": "2026-03-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F760",
        "memberId": "19016",
        "paymentDate": "2022-06-22",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F761",
        "memberId": "19016",
        "paymentDate": "2024-11-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F762",
        "memberId": "19016",
        "paymentDate": "2025-11-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F763",
        "memberId": "19017",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F764",
        "memberId": "19017",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F765",
        "memberId": "19017",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F766",
        "memberId": "19017",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F767",
        "memberId": "19017",
        "paymentDate": "2026-06-20",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F768",
        "memberId": "19018",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F769",
        "memberId": "19018",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F770",
        "memberId": "19018",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F771",
        "memberId": "19018",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F772",
        "memberId": "36001",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F773",
        "memberId": "ส.170008",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F774",
        "memberId": "19019",
        "paymentDate": "2022-06-23",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F775",
        "memberId": "19019",
        "paymentDate": "2024-06-27",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F776",
        "memberId": "19019",
        "paymentDate": "2025-07-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F777",
        "memberId": "23003",
        "paymentDate": "2022-06-24",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F778",
        "memberId": "23003",
        "paymentDate": "2023-06-16",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F779",
        "memberId": "23003",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F780",
        "memberId": "23003",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F781",
        "memberId": "23003",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F782",
        "memberId": "19020",
        "paymentDate": "2022-06-24",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F783",
        "memberId": "19020",
        "paymentDate": "2024-08-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F784",
        "memberId": "19020",
        "paymentDate": "2025-08-12",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F785",
        "memberId": "ส.18002",
        "paymentDate": "2022-06-26",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F786",
        "memberId": "19022",
        "paymentDate": "2023-06-16",
        "amount": 300,
        "year": 2023,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F787",
        "memberId": "19022",
        "paymentDate": "2024-06-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F788",
        "memberId": "19022",
        "paymentDate": "2025-06-17",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F789",
        "memberId": "19022",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F790",
        "memberId": "19021",
        "paymentDate": "2022-07-02",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F791",
        "memberId": "36002",
        "paymentDate": "2022-07-09",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F792",
        "memberId": "36002",
        "paymentDate": "2024-08-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F793",
        "memberId": "03011",
        "paymentDate": "2022-03-21",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F794",
        "memberId": "14014",
        "paymentDate": "2022-05-27",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F795",
        "memberId": "24002",
        "paymentDate": "2022-08-22",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F796",
        "memberId": "24002",
        "paymentDate": "2024-08-12",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F797",
        "memberId": "24002",
        "paymentDate": "2025-08-13",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F798",
        "memberId": "16005",
        "paymentDate": "2022-12-09",
        "amount": 300,
        "year": 2022,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F799",
        "memberId": "09004",
        "paymentDate": "2024-06-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F800",
        "memberId": "09004",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F801",
        "memberId": "01036",
        "paymentDate": "2024-06-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F802",
        "memberId": "01036",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F803",
        "memberId": "35002",
        "paymentDate": "2024-06-04",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F804",
        "memberId": "15002",
        "paymentDate": "2024-06-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F805",
        "memberId": "15002",
        "paymentDate": "2025-06-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F806",
        "memberId": "15003",
        "paymentDate": "2024-06-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F807",
        "memberId": "14015",
        "paymentDate": "2024-06-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F808",
        "memberId": "01022",
        "paymentDate": "2024-06-10",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F809",
        "memberId": "01022",
        "paymentDate": "2025-07-01",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F810",
        "memberId": "01022",
        "paymentDate": "2026-06-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F811",
        "memberId": "19023",
        "paymentDate": "2024-06-10",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F812",
        "memberId": "19023",
        "paymentDate": "2025-07-20",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F813",
        "memberId": "19023",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F814",
        "memberId": "01007",
        "paymentDate": "2024-06-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F815",
        "memberId": "01007",
        "paymentDate": "2025-06-17",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F816",
        "memberId": "01007",
        "paymentDate": "2026-06-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F817",
        "memberId": "01020",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F818",
        "memberId": "01020",
        "paymentDate": "2025-06-25",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F819",
        "memberId": "01020",
        "paymentDate": "2026-06-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F820",
        "memberId": "01144",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F821",
        "memberId": "06001",
        "paymentDate": "2024-06-13",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F822",
        "memberId": "06001",
        "paymentDate": "2026-05-21",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F823",
        "memberId": "08004",
        "paymentDate": "2024-06-17",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F824",
        "memberId": "08004",
        "paymentDate": "2025-06-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F825",
        "memberId": "09019",
        "paymentDate": "2024-06-24",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F826",
        "memberId": "09020",
        "paymentDate": "2024-06-24",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F827",
        "memberId": "09020",
        "paymentDate": "2025-06-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F828",
        "memberId": "27002",
        "paymentDate": "2024-06-25",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F829",
        "memberId": "27003",
        "paymentDate": "2024-06-25",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F830",
        "memberId": "05008",
        "paymentDate": "2024-06-26",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F831",
        "memberId": "05009",
        "paymentDate": "2024-06-26",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F832",
        "memberId": "09013",
        "paymentDate": "2024-06-26",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F833",
        "memberId": "12007",
        "paymentDate": "2024-06-27",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F834",
        "memberId": "26001",
        "paymentDate": "2024-07-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F835",
        "memberId": "19024",
        "paymentDate": "2024-07-27",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F836",
        "memberId": "19024",
        "paymentDate": "2025-07-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F837",
        "memberId": "19025",
        "paymentDate": "2024-07-27",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F838",
        "memberId": "19025",
        "paymentDate": "2025-07-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F839",
        "memberId": "19026",
        "paymentDate": "2024-08-01",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F840",
        "memberId": "19026",
        "paymentDate": "2025-08-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F841",
        "memberId": "19027",
        "paymentDate": "2024-08-08",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F842",
        "memberId": "19027",
        "paymentDate": "2025-08-13",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F843",
        "memberId": "35003",
        "paymentDate": "2024-08-11",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F844",
        "memberId": "35003",
        "paymentDate": "2025-09-12",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F845",
        "memberId": "39001",
        "paymentDate": "2024-08-14",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F846",
        "memberId": "15004",
        "paymentDate": "2024-08-15",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F847",
        "memberId": "15004",
        "paymentDate": "2025-08-16",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F848",
        "memberId": "18015",
        "paymentDate": "2024-10-06",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F849",
        "memberId": "18015",
        "paymentDate": "2025-10-29",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F850",
        "memberId": "02019",
        "paymentDate": "2024-10-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F851",
        "memberId": "02019",
        "paymentDate": "2025-10-04",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F852",
        "memberId": "07020",
        "paymentDate": "2024-10-08",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F853",
        "memberId": "19028",
        "paymentDate": "2024-11-07",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F854",
        "memberId": "09021",
        "paymentDate": "2024-11-08",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F855",
        "memberId": "09022",
        "paymentDate": "2024-11-08",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F856",
        "memberId": "22001",
        "paymentDate": "2024-11-27",
        "amount": 300,
        "year": 2024,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F857",
        "memberId": "22001",
        "paymentDate": "2025-11-25",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F858",
        "memberId": "09015",
        "paymentDate": "2025-02-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F859",
        "memberId": "09015",
        "paymentDate": "2026-01-08",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F860",
        "memberId": "06015",
        "paymentDate": "2025-02-21",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F861",
        "memberId": "06015",
        "paymentDate": "2026-02-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F862",
        "memberId": "19029",
        "paymentDate": "2025-04-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F863",
        "memberId": "19029",
        "paymentDate": "2026-05-11",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F864",
        "memberId": "02020",
        "paymentDate": "2025-04-18",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F865",
        "memberId": "02020",
        "paymentDate": "2026-04-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F866",
        "memberId": "01145",
        "paymentDate": "2025-04-24",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F867",
        "memberId": "09016",
        "paymentDate": "2025-04-26",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F868",
        "memberId": "09016",
        "paymentDate": "2026-04-01",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F869",
        "memberId": "24003",
        "paymentDate": "2025-05-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F870",
        "memberId": "24003",
        "paymentDate": "2026-05-14",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F871",
        "memberId": "14015",
        "paymentDate": "2025-05-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F872",
        "memberId": "14015",
        "paymentDate": "2026-05-10",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F873",
        "memberId": "34003",
        "paymentDate": "2025-05-06",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F874",
        "memberId": "02021",
        "paymentDate": "2025-05-08",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F875",
        "memberId": "02021",
        "paymentDate": "2026-05-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F876",
        "memberId": "20001",
        "paymentDate": "2025-05-10",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F877",
        "memberId": "20001",
        "paymentDate": "2026-05-11",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F878",
        "memberId": "20001",
        "paymentDate": "2026-05-11",
        "amount": 300,
        "year": 2027,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F879",
        "memberId": "19030",
        "paymentDate": "2025-06-09",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F880",
        "memberId": "19030",
        "paymentDate": "2026-06-03",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F881",
        "memberId": "01146",
        "paymentDate": "2025-08-25",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F882",
        "memberId": "29001",
        "paymentDate": "2025-10-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F883",
        "memberId": "19031",
        "paymentDate": "2025-10-05",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F884",
        "memberId": "17008",
        "paymentDate": "2025-10-23",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F885",
        "memberId": "24004",
        "paymentDate": "2025-10-19",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F886",
        "memberId": "02006",
        "paymentDate": "2025-10-29",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F887",
        "memberId": "30001",
        "paymentDate": "2025-11-15",
        "amount": 300,
        "year": 2025,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F888",
        "memberId": "19032",
        "paymentDate": "2026-03-04",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F889",
        "memberId": "03013",
        "paymentDate": "2026-03-18",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F890",
        "memberId": "37001",
        "paymentDate": "2026-05-22",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F891",
        "memberId": "06016",
        "paymentDate": "2026-05-31",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F892",
        "memberId": "01101",
        "paymentDate": "2026-06-05",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F893",
        "memberId": "42002",
        "paymentDate": "2026-06-17",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F894",
        "memberId": "10003",
        "paymentDate": "2026-06-15",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F895",
        "memberId": "ส.3001",
        "paymentDate": "2026-06-15",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F896",
        "memberId": "40001",
        "paymentDate": "2026-06-13",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F897",
        "memberId": "04005",
        "paymentDate": "2026-06-13",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F898",
        "memberId": "06017",
        "paymentDate": "2026-06-20",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F899",
        "memberId": "20002",
        "paymentDate": "2026-06-20",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F900",
        "memberId": "24005",
        "paymentDate": "2026-06-16",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F901",
        "memberId": "33001",
        "paymentDate": "2026-06-21",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F902",
        "memberId": "33002",
        "paymentDate": "2026-06-21",
        "amount": 300,
        "year": 2026,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F903",
        "memberId": "06008",
        "paymentDate": "2020-09-11",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F904",
        "memberId": "06008",
        "paymentDate": "2020-09-11",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F905",
        "memberId": "14009",
        "paymentDate": "2020-09-12",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F906",
        "memberId": "14009",
        "paymentDate": "2020-09-12",
        "amount": 300,
        "year": 2020,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F907",
        "memberId": "01035",
        "paymentDate": "2021-02-07",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    },
    {
        "id": "F908",
        "memberId": "01064",
        "paymentDate": "2021-06-06",
        "amount": 300,
        "year": 2021,
        "recordedBy": "ผู้ดูแลทะเบียนสมาชิก"
    }
];

// ประวัติการจ่ายสวัสดิการ
const INITIAL_WELFARES = [
    {
        "id": "W001",
        "recipientId": "28001",
        "recipientType": "member",
        "welfareType": "member_deceased",
        "claimDate": "2021-09-10",
        "amount": 5000,
        "details": "สมาชิกถึงแก่กรรม ร่วมสวัสดิการฌาปนกิจศพ",
        "recordedBy": "ผู้ดูแลสวัสดิการ"
    },
    {
        "id": "W002",
        "recipientId": "01083",
        "recipientType": "member",
        "welfareType": "member_medical",
        "claimDate": "2025-01-30",
        "amount": 1500,
        "details": "เยี่ยมไข้สมาชิกเจ็บป่วย พักรักษาตัว ณ โรงพยาบาล",
        "recordedBy": "ผู้ดูแลสวัสดิการ"
    },
    {
        "id": "W003",
        "recipientId": "07001",
        "recipientType": "member",
        "welfareType": "member_medical",
        "claimDate": "2026-01-06",
        "amount": 1500,
        "details": "เยี่ยมไข้สมาชิกเจ็บป่วย พักรักษาตัว ณ โรงพยาบาล",
        "recordedBy": "ผู้ดูแลสวัสดิการ"
    },
    {
        "id": "W004",
        "recipientId": "A0001",
        "recipientType": "teacher",
        "welfareType": "teacher_medical",
        "claimDate": "2026-03-12",
        "amount": 2000,
        "details": "ผ่าตัดต้อกระจก พักรักษาตัว ณ โรงพยาบาลพญาไท",
        "recordedBy": "ผู้ดูแลสวัสดิการ"
    },
    {
        "id": "W005",
        "recipientId": "A0009",
        "recipientType": "teacher",
        "welfareType": "teacher_deceased",
        "claimDate": "2025-11-20",
        "amount": 2000,
        "details": "อ.กุหลาบ ศิริบุญพันธ์ ถึงแก่กรรม ร่วมทำบุญฌาปนกิจศพ",
        "recordedBy": "ผู้ดูแลสวัสดิการ"
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
