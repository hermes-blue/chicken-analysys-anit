export function getInterpretation(brand, conditions) {
  const { capital, location, labor } = conditions;
  const brandCost = brand.costs.totalStartup;
  
  let advice = [];
  let alerts = [];

  // --- 1. Capital Check ---
  const capitalMap = { low: 7000, medium: 12000, high: 20000 };
  const userMoney = capitalMap[capital];

  if (userMoney < brandCost) {
    alerts.push({
      type: "risk",
      text: `사장님, 현재 준비하신 예산보다 약 ${Math.round((brandCost - userMoney) / 100) / 10}억 원이 더 필요해 보여요. 대출을 고려하신다면 이자 비용도 꼭 운영비에 포함하셔야 합니다.`
    });
  } else {
    advice.push({
      type: "info",
      text: "자금 계획이 아주 훌륭하세요! 여유 자금이 넉넉하면 초기 마케팅이나 운영 안정화에 더 집중하실 수 있습니다."
    });
  }

  // --- 2. Location Check ---
  if (location === "normal") {
    alerts.push({
      type: "warning",
      text: "입지가 조금 애매한 곳이라면, 배달 매출 비중을 80% 이상으로 잡고 마케팅 전략을 세우시는 게 안전합니다."
    });
  } else if (location === "premium") {
    advice.push({
      type: "good",
      text: "좋은 자리를 보고 계시는군요! 다만 임대료가 예상을 상회하면 손익분기점이 확 올라갈 수 있으니 주의하세요."
    });
  }

  // --- 3. Labor Check ---
  if (labor === "staff2") {
    alerts.push({
      type: "warning",
      text: "직원을 2명 이상 두시면 사장님의 몸은 편하시겠지만, 한 달에 나가는 인건비만 500~600만 원이에요. 매출이 꾸준하지 않으면 순익이 순식간에 마이너스가 될 수 있습니다."
    });
  } else if (labor === "solo") {
    advice.push({
      type: "info",
      text: "혼자 운영하시면 인건비를 가장 많이 아낄 수 있어 수익성은 최고예요. 다만 체력 관리가 곧 사업의 지속 가능성이라는 점 잊지 마세요!"
    });
  }

  return { advice, alerts };
}

export function formatCurrency(value) {
  if (value >= 10000) {
    return `${Math.floor(value / 10000)}억 ${value % 10000 > 0 ? (value % 10000) + '만' : ''}원`;
  }
  return `${value}만 원`;
}
