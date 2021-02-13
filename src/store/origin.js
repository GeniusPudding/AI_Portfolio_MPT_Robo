let data = {
    BfNo: 0,
    Token: '',
    questionnaire: 0,
    username: "親愛的EC客戶",
    user_id: "",
    risk_prop: "穩健",
    useMail: true,

    fundPool: [
        //{type: [{marketType: [fundName]}] }
    ],
    investmentAmount: [
        //對應personalPortfolio的投資金額 可由用戶修改
    ],
    personalPortfolio: [
        //個人編輯中的基金組合: {fundName, }
    ],
    strategyList: [{
            value: "3",
            name: "積極型"
        },
        {
            value: "2",
            name: "穩健型"
        },
        {
            value: "1",
            name: "保守型"
        }
    ],
    IdNo: "",
    isEC: false,
    isLogin: false,
    isEditable: true,
    isCheckingEmpty: false,
    budget: 100000
};
export default data;