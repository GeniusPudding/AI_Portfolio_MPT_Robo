let data = {
    client_ip: '',
    recommendedSource: 'tv',
    BfNo: 0,
    token: '',
    questionnaire: 0,
    username: "親愛的EC客戶",
    user_id: "",
    rr_value: 3,
    rr_param: {"rr_value": 3},
    useMail: true,
    authorizationHeader: {},
    fundPool: [
        //{type: [{marketType: [fundName]}] }
    ],
    initPorfolio: [],
    initAmount: [],
    investmentAmount: [
        //對應personalPortfolio的投資金額 可由用戶修改
    ],
    personalPortfolio: [
        //個人編輯中的基金組合: {fundName, }
    ],
    recommendedPortfolio: [],
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
    IdNo: "", //EC帳號
    Passwd: '',
    isSubmit: false,
    isEC: false,
    isLogin: false,
    isEditable: true,
    isCheckingEmpty: false,
    budget: 100000
};
export default data;