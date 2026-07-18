/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MapPin, Info, ArrowRight, Star, Clock } from "lucide-react";
import { audioEffects } from "./AudioEffects";
import { Language } from "../types";

interface CityCenter {
  id: string;
  name: Record<Language, string>;
  status: "active" | "soon";
  address: Record<Language, string>;
  phone: string;
  services: Record<Language, string[]>;
  coordinates: { x: number; y: number }; // Relative percentage for custom SVG
}

interface MoroccoMapProps {
  currentLang: Language;
}

export default function MoroccoMap({ currentLang }: MoroccoMapProps) {
  const [selectedCity, setSelectedCity] = useState<string>("casablanca");

  // Morocco map locations
  const centers: CityCenter[] = [
    {
      id: "casablanca",
      name: {
        FR: "Casablanca (Siège Principal)",
        AR: "الدار البيضاء (المقر الرئيسي)",
        EN: "Casablanca (Main Headquarters)",
        ZH: "卡萨布兰卡 (总部落户)",
      },
      status: "active",
      address: {
        FR: "Ecole Al Akhtal Banate - Bd Afghanistan - Hay Hassani, 20000 Casablanca",
        AR: "مدرسة الأخطل بنات - شارع أفغانستان - الحي الحسني، 20000 الدار البيضاء",
        EN: "Al Akhtal School for Girls - Afghanistan Blvd - Hay Hassani, 20000 Casablanca",
        ZH: "Al Akhtal 女子学校 - 阿富汗大道 - Hay Hassani, 20000 卡萨布兰卡",
      },
      phone: "+212 (0) 5.22.01.34.44",
      services: {
        FR: ["Orthophonie", "Psychomotricité", "Soutien Familial", "Dépistage Précoce", "Formation des Enseignants"],
        AR: ["تقويم النطق", "العلاج النفسي الحركي", "الدعم الأسري", "التشخيص المبكر", "تكوين المعلمين"],
        EN: ["Speech Therapy", "Psychomotor Therapy", "Family Support", "Early Screening", "Teacher Training"],
        ZH: ["言语治疗", "精神运动疗法", "家庭支持", "早期筛查", "教师培训"],
      },
      coordinates: { x: 38, y: 22 },
    },
    {
      id: "rabat",
      name: {
        FR: "Rabat",
        AR: "الرباط",
        EN: "Rabat",
        ZH: "拉巴特",
      },
      status: "active",
      address: {
        FR: "Centre d'Orientation DYS - Agdal, Rabat",
        AR: "مركز التوجيه والتشخيص - أقدال، الرباط",
        EN: "DYS Orientation & Diagnosis Center - Agdal, Rabat",
        ZH: "DYS 诊断与指导中心 - 阿克达尔, 拉巴特",
      },
      phone: "+212 (0) 6.61.89.74.67",
      services: {
        FR: ["Psychométrie", "Dépistage Précoce", "Orientation Scolaire"],
        AR: ["القياس النفسي", "التشخيص المبكر", "التوجيه المدرسي"],
        EN: ["Psychometrics", "Early Screening", "School Orientation"],
        ZH: ["心理测验", "早期筛查", "学校导向"],
      },
      coordinates: { x: 42, y: 17 },
    },
    {
      id: "marrakech",
      name: {
        FR: "Marrakech",
        AR: "مراكش",
        EN: "Marrakech",
        ZH: "马拉喀什",
      },
      status: "active",
      address: {
        FR: "Cellule d'Accompagnement AMTDA - Guéliz, Marrakech",
        AR: "خلية المواكبة والدعم - جيليز، مراكش",
        EN: "Support and Guidance Cell - Gueliz, Marrakech",
        ZH: "支持与辅导小组 - 吉利兹, 马拉喀什",
      },
      phone: "+212 (0) 6.77.15.88.88",
      services: {
        FR: ["Soutien Psychologique", "Jeux Sérieux", "Ateliers Créatifs"],
        AR: ["الدعم النفسي", "الألعاب الجادة", "الورشات الإبداعية"],
        EN: ["Psychological Support", "Serious Games", "Creative Workshops"],
        ZH: ["心理支持", "严肃游戏", "创意工坊"],
      },
      coordinates: { x: 30, y: 35 },
    },
    {
      id: "fez",
      name: {
        FR: "Fès",
        AR: "فاس",
        EN: "Fez",
        ZH: "菲斯",
      },
      status: "active",
      address: {
        FR: "Antenne Nord-Est AMTDA - Batha, Fès",
        AR: "فرع الشمال الشرقي - البطحاء، فاس",
        EN: "North-East Branch - Batha, Fez",
        ZH: "东北分部 - 巴塔, 菲斯",
      },
      phone: "+212 (0) 6.63.53.55.69",
      services: {
        FR: ["Orthophonie", "Soutien aux Devoirs", "Parentalité Positive"],
        AR: ["تقويم النطق", "مواكبة الدروس", "التربية الإيجابية"],
        EN: ["Speech Therapy", "Homework Support", "Positive Parenting"],
        ZH: ["言语治疗", "家庭作业辅导", "积极育儿"],
      },
      coordinates: { x: 49, y: 20 },
    },
    {
      id: "agadir",
      name: {
        FR: "Agadir",
        AR: "أكادير",
        EN: "Agadir",
        ZH: "阿加迪尔",
      },
      status: "active",
      address: {
        FR: "Centre Souss-Massa pour l'Intégration Scolaire - Agadir",
        AR: "مركز سوس ماسة للإدماج المدرسي - أكادير",
        EN: "Souss-Massa Center for Inclusive Education - Agadir",
        ZH: "苏斯-马萨融合教育中心 - 阿加迪尔",
      },
      phone: "+212 (0) 5.22.01.34.44",
      services: {
        FR: ["Orthophonie", "Dépistage Itinérant", "Soutien Psychomoteur"],
        AR: ["تقويم النطق", "التشخيص المتنقل", "الدعم النفسي الحركي"],
        EN: ["Speech Therapy", "Mobile Screening Caravan", "Psychomotor Support"],
        ZH: ["言语治疗", "流动筛查大篷车", "精神运动支持"],
      },
      coordinates: { x: 21, y: 47 },
    },
    {
      id: "oujda",
      name: {
        FR: "Oujda",
        AR: "وجدة",
        EN: "Oujda",
        ZH: "乌季达",
      },
      status: "active",
      address: {
        FR: "Relais de l'Oriental AMTDA - Oujda",
        AR: "نقطة تواصل الجهة الشرقية - وجدة",
        EN: "Eastern Regional Liaison Office - Oujda",
        ZH: "东部地区联络处 - 乌季达",
      },
      phone: "+212 (0) 6.77.15.88.88",
      services: {
        FR: ["Sensibilisation Publique", "Formations Enseignants"],
        AR: ["التوعية العامة", "تكوين المدرسين"],
        EN: ["Public Awareness", "Teacher Training Sessions"],
        ZH: ["公众意识", "教师培训课程"],
      },
      coordinates: { x: 62, y: 13 },
    },
    {
      id: "laayoune",
      name: {
        FR: "Laâyoune (Bientôt)",
        AR: "العيون (قريباً)",
        EN: "Laâyoune (Coming Soon)",
        ZH: "阿尤恩 (即将开业)",
      },
      status: "soon",
      address: {
        FR: "Nouveau Centre AMTDA des Provinces du Sud - Laâyoune",
        AR: "المركز الجديد للجمعية بالأقاليم الجنوبية - العيون",
        EN: "New AMTDA Southern Provinces Center - Laâyoune",
        ZH: "南部省份新中心 - 阿尤恩",
      },
      phone: "+212 (0) 6.77.15.88.88",
      services: {
        FR: ["Prise en Charge Intégrale", "Dépistage Précoce", "Unité Mobile"],
        AR: ["التكفل الشامل", "التشخيص المبكر", "الوحدة المتنقلة"],
        EN: ["Comprehensive Care", "Early Screening", "Mobile Clinic Unit"],
        ZH: ["综合护理", "早期筛查", "流动诊所"],
      },
      coordinates: { x: 11, y: 68 },
    },
    {
      id: "boujdour",
      name: {
        FR: "Boujdour (Bientôt)",
        AR: "بوجدور (قريباً)",
        EN: "Boujdour (Coming Soon)",
        ZH: "博哈多尔 (即将开业)",
      },
      status: "soon",
      address: {
        FR: "Point d'Antenne Communautaire - Boujdour",
        AR: "نقطة الإرشاد المجتمعي - بوجدور",
        EN: "Community Counseling Point - Boujdour",
        ZH: "社区咨询站 - 博哈多尔",
      },
      phone: "+212 (0) 6.77.15.88.88",
      services: {
        FR: ["Dépistage Itinérant", "Soutien Parental"],
        AR: ["التشخيص المتنقل", "دعم أولياء الأمور"],
        EN: ["Mobile Screening Caravan", "Parental Guidance"],
        ZH: ["流动筛查大篷车", "父母指导"],
      },
      coordinates: { x: 7, y: 76 },
    },
    {
      id: "dakhla",
      name: {
        FR: "Dakhla (Bientôt)",
        AR: "الداخلة (قريباً)",
        EN: "Dakhla (Coming Soon)",
        ZH: "达赫拉 (即将开业)",
      },
      status: "soon",
      address: {
        FR: "Pôle d'Excellence DYS du Sahara Marocain - Dakhla",
        AR: "قطب التميز لصعوبات التعلم بالصحراء المغربية - الداخلة",
        EN: "Moroccan Sahara DYS Center of Excellence - Dakhla",
        ZH: "摩洛哥撒哈拉 DYS 卓越中心 - 达赫拉",
      },
      phone: "+212 (0) 6.77.15.88.88",
      services: {
        FR: ["Thérapies Innovantes", "Formation de Spécialistes", "Télémédecine DYS"],
        AR: ["العلاجات المبتكرة", "تكوين الأخصائيين", "التطبيب عن بعد لصعوبات التعلم"],
        EN: ["Innovative Therapies", "Specialists Training", "Telemedicine DYS Services"],
        ZH: ["创新疗法", "专科培训", "远程医疗 DYS 服务"],
      },
      coordinates: { x: 3, y: 88 },
    },
  ];

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId);
    audioEffects.playPop();
  };

  const selectedData = centers.find((c) => c.id === selectedCity) || centers[0];

  const dict = {
    title: {
      FR: "Notre Présence au Maroc",
      AR: "تواجدنا في المغرب",
      EN: "Our Presence in Morocco",
      ZH: "我们在摩洛哥的足迹",
    },
    subtitle: {
      FR: "Découvrez nos centres d'accompagnement et d'intégration à travers le Royaume.",
      AR: "اكتشف مراكز المرافقة والإدماج التابعة لنا عبر ربوع المملكة.",
      EN: "Explore our support and inclusive centers across the Kingdom.",
      ZH: "探索我们在摩洛哥全国各地的支持和融合中心。",
    },
    activeLabel: {
      FR: "Centre Actif",
      AR: "مركز نشط",
      EN: "Active Center",
      ZH: "活跃中心",
    },
    soonLabel: {
      FR: "Ouverture Prochaine",
      AR: "افتتاح قريب",
      EN: "Coming Soon",
      ZH: "即将开业",
    },
    addressLabel: {
      FR: "Adresse",
      AR: "العنوان",
      EN: "Address",
      ZH: "地址",
    },
    phoneLabel: {
      FR: "Téléphone",
      AR: "الهاتف",
      EN: "Phone",
      ZH: "电话",
    },
    servicesLabel: {
      FR: "Services Offerts",
      AR: "الخدمات المقدمة",
      EN: "Offered Services",
      ZH: "提供的服务",
    },
    btnCall: {
      FR: "Appeler le centre",
      AR: "اتصل بالمركز",
      EN: "Call center",
      ZH: "呼叫中心",
    },
    hqTitle: {
      FR: "Siège National (Casablanca)",
      AR: "المقر الوطني (الدار البيضاء)",
      EN: "National Headquarters (Casablanca)",
      ZH: "全国总部 (卡萨布兰卡)",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="morocco-map-section">
      {/* Map Column */}
      <div className="lg:col-span-7 bg-[#fbfcfb] rounded-3xl p-6 border-2 border-emerald-800/10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[500px]">
        {/* Background elements */}
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-xl font-bold text-emerald-900 font-sans tracking-tight">
            {dict.title[currentLang]}
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mt-1">
            {dict.subtitle[currentLang]}
          </p>
        </div>

        {/* Moroccan Map Visual Container */}
        <div className="relative w-full h-[450px] mt-12 select-none flex items-center justify-center">
          {/* Custom SVG Representation of Unified Morocco & Sahara */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full max-h-[400px] text-emerald-800"
            style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.06))" }}
          >
            {/* Outline path of unified Morocco including Sahara as one unit (no separate lines) */}
            <g fill="#e6ede8" stroke="#10b981" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
              {/* Northern / Central Morocco & Sahara unified path */}
              <path
                d="M 48,2 
                   C 54,4 62,6 68,8 
                   C 69,11 72,16 73,21 
                   C 70,23 68,26 65,28 
                   C 62,31 58,35 55,39 
                   C 51,43 48,46 44,49 
                   C 39,52 35,55 31,58 
                   C 29,61 28,66 28,70 
                   L 28,82 
                   L 20,82 
                   L 20,98 
                   L 1,98 
                   C 1,95 2,92 3,88 
                   C 4,84 6,80 7,76 
                   C 9,72 10,69 11,66 
                   C 13,62 14,59 16,56 
                   C 18,52 20,49 22,46 
                   C 24,42 26,38 28,34 
                   C 30,30 33,26 36,22 
                   C 39,18 42,14 44,10 
                   C 46,6 47,4 48,2 
                   Z"
              />
            </g>

            {/* Render Pins */}
            {centers.map((city) => {
              const isSelected = city.id === selectedCity;
              return (
                <g
                  key={city.id}
                  transform={`translate(${city.coordinates.x}, ${city.coordinates.y})`}
                  className="cursor-pointer group"
                  onClick={() => handleCityClick(city.id)}
                >
                  {/* Subtle Radar effect for active hubs */}
                  {city.status === "active" && (
                    <circle
                      r="4"
                      className="fill-emerald-500 animate-ping opacity-60"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                  {/* Outer circle marker */}
                  <circle
                    r={isSelected ? "3.5" : "2.2"}
                    className={`transition-all duration-300 ${
                      isSelected
                        ? "fill-orange-500 stroke-white stroke-[0.8]"
                        : city.status === "active"
                        ? "fill-emerald-700 hover:fill-emerald-500"
                        : "fill-blue-500 hover:fill-blue-400"
                    }`}
                  />
                  {/* Label tooltip (subtle) */}
                  <text
                    y="-5"
                    textAnchor="middle"
                    className={`font-sans text-[3px] font-bold fill-emerald-950 transition-all duration-300 pointer-events-none ${
                      isSelected ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100 scale-100"
                    }`}
                  >
                    {city.name[currentLang].split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Compass / Key */}
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-emerald-800/10 text-xs shadow-sm flex flex-col gap-1.5 pointer-events-none">
            <div className="flex items-center gap-1.5 text-emerald-950 font-semibold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-emerald-600 stroke-none" />
              <span>AMTDA Network</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>{dict.activeLabel[currentLang]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span>{dict.soonLabel[currentLang]}</span>
            </div>
          </div>
        </div>

        {/* Quick clickable list for accessibility */}
        <div className="flex flex-wrap gap-1.5 mt-4 border-t border-gray-100 pt-4">
          {centers.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCityClick(c.id)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 ${
                selectedCity === c.id
                  ? "bg-emerald-600 text-white"
                  : c.status === "soon"
                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c.name[currentLang].split(" (")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Info Panel Column */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Dynamic Center Info Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-800/10 shadow-lg flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <span
                  className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                    selectedData.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800 animate-pulse"
                  }`}
                >
                  {selectedData.status === "active" ? dict.activeLabel[currentLang] : dict.soonLabel[currentLang]}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mt-2 font-sans tracking-tight">
                  {selectedData.name[currentLang]}
                </h4>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-700">
                <MapPin className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* Address */}
              <div>
                <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">
                  {dict.addressLabel[currentLang]}
                </span>
                <p className="text-sm text-gray-700 mt-1 font-medium leading-relaxed">
                  {selectedData.address[currentLang]}
                </p>
              </div>

              {/* Phone */}
              <div>
                <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">
                  {dict.phoneLabel[currentLang]}
                </span>
                <a
                  href={`tel:${selectedData.phone.replace(/[^0-9+]/g, "")}`}
                  onMouseEnter={() => audioEffects.playPhoneRing()}
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold text-base mt-1 hover:underline transition-all duration-200"
                >
                  {selectedData.phone}
                </a>
              </div>

              {/* Services */}
              <div>
                <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider mb-2">
                  {dict.servicesLabel[currentLang]}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedData.services[currentLang].map((serv, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs bg-gray-50 text-gray-700 rounded-lg border border-gray-200/60 font-medium"
                    >
                      {serv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <a
              href={`tel:${selectedData.phone.replace(/[^0-9+]/g, "")}`}
              onMouseEnter={() => audioEffects.playPhoneRing()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all duration-200 text-sm"
            >
              <span>{dict.btnCall[currentLang]}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Real Address Exact Iframe Map Panel */}
        <div className="bg-gray-50 rounded-3xl p-4 border border-emerald-800/10 shadow-md">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Info className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {dict.hqTitle[currentLang]}
            </span>
          </div>
          {/* Exact map widget or fallback container showing exact location info */}
          <div className="w-full h-36 rounded-2xl overflow-hidden relative border border-gray-200 bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.5950150992386!2d-7.6698188!3d33.5638422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2df559599c9%3A0x6b7713d9cfc58066!2sBd%20Afghanistan%2C%20Casablanca%2020200!5e0!3m2!1sfr!2sma!4v1715694823212!5m2!1sfr!2sma"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AMTDA Casablanca Map"
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-2 px-1 text-center font-mono">
            Ecole Al Akhtal Banate - Bd Afghanistan - Hay Hassani
          </p>
        </div>
      </div>
    </div>
  );
}
