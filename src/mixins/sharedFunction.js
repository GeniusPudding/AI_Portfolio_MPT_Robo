export default {
    methods: {
        toggleModal(name) {
            console.log("shared toggleModal name:", name);
            this.$refs[name].toggle = !this.$refs[name].toggle;
        },
        setPercentage(val, quantile, isSign) {
            var num = val ? val : 0
            var percent = isSign ? `${num.toFixed(quantile)}%` : Number(num.toFixed(quantile))
            return percent
        },
        localLog(...strs){
            if (location.hostname == 'localhost'){
                console.log(...strs)
            }
        }
    }
};