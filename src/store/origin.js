let data = {
    isLoaded: false,// for loading API data 
    client_ip: '',// some of API need it 
    BfNo: 0,// EC account number, 0 if not EC 
    Gid: '',// EC account 
    token: '',// for identify the API client, especially those not EC customers
    username: "",// name that will displayed on header
    rr_value: 5, // 1~3 acceptable risk level of client
    rr_param: {"rr_value": 5}, // rr for API parameter format
    useMail: false, // channel for report sending  (default: sms)
    authorizationHeader: {},// used for API header
    fundPool: [
        //{type: [{marketType: [fundName]}] }
    ], // all funds info of Franklin
    initPorfolio: [],
    initAmount: [],
    investmentAmount: [
        // correspond to personalPortfolio, editable
    ],
    personalPortfolio: [
        // editable fund portfolio: {fundName, }
    ],
    recommendedPortfolio: [], // recom portfolio from backend
    IdNo: "", //EC account (id number)
    Passwd: '', //EC password
    isSubmit: false,// block buttons when submitting forms
    isLogin: false, // for saving loginned state
    isEditable: true,//(need to store it here?) for distinguish if fund list on web page is editable 
    isCheckingEmpty: false,// for checking fund list before getting recom list
};
export default data;