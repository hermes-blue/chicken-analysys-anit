export const brands = [
  {
    id: "kyochon",
    name: "교촌치킨",
    tagline: "국내 1위 프리미엄 브랜드",
    summary: "초보자도 안정적으로 운영 가능하지만, 초기 투자비용과 본사 가이드가 꼼꼼한 편이에요.",
    metrics: {
      friendliness: "상",
      investment: "높음",
      dependency: "높음",
      profitability: "매우 안정적"
    },
    costs: {
      franchiseFee: 3100, // 가맹비 (VAT 포함)
      educationFee: 550,   // 교육비
      deposit: 1000,       // 보증금
      interior: 6500,      // 인테리어 (20평 기준)
      equipment: 3000,     // 기기/집기
      totalStartup: 14150  // 총합 (기타/별도공사 제외)
    },
    monthly: {
      sales: 6500,         // 평균 매출
      materialCost: 52,    // 원가율 (%)
      royalty: 3.3,        // 로열티 (%)
      labor: 600,          // 평균 인건비
      rent: 400            // 평균 임대료
    },
    interpretations: {
      isItWorthIt: [
        "교촌은 브랜드 파워가 압도적이에요. 광고를 따로 안 해도 손님이 찾아오죠.",
        "수익률보다는 '안정성'을 보고 가는 분들께 추천드려요.",
        "본사 관리가 철저해서 운영이 투박해도 맛의 편차가 적습니다."
      ],
      initialCost: [
        "처음 시작할 때 1.4억~1.5억 정도는 생각하셔야 해요.",
        "인테리어 비용이 다른 브랜드보다 조금 더 나가는 편이지만, 그만큼 매장이 깔끔하죠.",
        "보증금과 별도 공사(철거, 전기 등)를 합치면 2억 가까이 필요할 수 있습니다."
      ],
      monthlyProfit: [
        "매출이 잘 나와도 원가와 로열티를 떼고 나면, 사장님 손에는 매출의 15~20% 정도가 남는 게 일반적이에요.",
        "6,500만 원 매출 기준으로 이것저것 다 떼면 1,000만 원 내외의 순이익을 기대해볼 수 있습니다."
      ],
      risks: [
        "본사의 공급가 정책에 따라 수익률이 출렁일 수 있어요.",
        "조리 과정이 다른 브랜드보다 까다로워 인건비 관리가 핵심입니다."
      ]
    }
  },
  {
    id: "bbq",
    name: "BBQ",
    tagline: "황금올리브의 강력한 팬덤",
    summary: "공격적인 마케팅과 확실한 맛의 강점이 있지만, 원가율 관리가 사장님의 핵심 숙제예요.",
    metrics: {
      friendliness: "중",
      investment: "보통",
      dependency: "중",
      profitability: "높은 매출"
    },
    costs: {
      franchiseFee: 1100,
      educationFee: 380,
      deposit: 500,
      interior: 4500,
      equipment: 2500,
      totalStartup: 8980
    },
    monthly: {
      sales: 5500,
      materialCost: 55,
      royalty: 2.2,
      labor: 500,
      rent: 300
    },
    interpretations: {
      isItWorthIt: [
        "황금올리브 치킨은 정말 잘 팔려요. 충성 고객이 확실하거든요.",
        "본사의 마케팅 활동이 활발해서 이슈가 자주 되고, 이는 곧 매출로 이어집니다."
      ],
      initialCost: [
        "교촌보다는 시작 비용이 저렴한 편이에요. 1억 미만으로도 세팅이 가능할 수 있죠.",
        "다만 집기류나 설비 옵션에 따라 비용이 추가될 수 있으니 꼼꼼히 체크하세요."
      ],
      monthlyProfit: [
        "BBQ는 원자재(올리브유 등) 가격에 예민해요. 매출은 커도 재료비로 나가는 돈이 많을 수 있습니다.",
        "직접 운영을 많이 하시는 사장님일수록 가져가는 돈이 커지는 구조입니다."
      ]
    }
  },
  {
    id: "bhc",
    name: "BHC",
    tagline: "트렌디한 메뉴와 효율적 운영",
    summary: "뿌링클 등 고정 팬들이 많고, 본사의 시스템이 잘 잡혀 있어 효율적인 운영이 가능합니다.",
    metrics: {
      friendliness: "상",
      investment: "보통",
      dependency: "중",
      profitability: "안정적 수익"
    },
    costs: {
      franchiseFee: 1100,
      educationFee: 330,
      deposit: 500,
      interior: 4000,
      equipment: 2200,
      totalStartup: 8130
    },
    monthly: {
      sales: 5800,
      materialCost: 53,
      royalty: 0, // 고정 금액인 경우가 많지만 여기선 비율로 단순화
      labor: 550,
      rent: 350
    },
    interpretations: {
      isItWorthIt: [
        "젊은 층에 인기 있는 메뉴가 많아 매출의 하방 경직성이 좋습니다.",
        "운영 매뉴얼이 깔끔해서 초보 사장님들이 접근하기 아주 좋지요."
      ],
      initialCost: [
        "8천만 원 수준에서 시작할 수 있어 부담이 적습니다.",
        "초기 자본이 부족하다면 BHC가 현실적인 대안이 될 수 있어요."
      ]
    }
  }
];
