export default {
    methods: {
        toggleModal(name) {
            console.log("toggleModal name:", name);
            this.$refs[name].toggle = !this.$refs[name].toggle;
        },
        setPercentage(val, quantile, isSign) {
            var num = val ? val : 0
            var percent = isSign ? `${num.toFixed(quantile)}%` : Number(num.toFixed(quantile))
            return percent
        }
    }
};