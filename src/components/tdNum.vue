<template>
    <td :class="{minus: bool}">
        {{numFormat(content)}}
    </td>
</template>
<script>
export default {
    props: {content:Number, numFormat:Function},
    computed:{
        bool () {
            return this.content< 0 || this.content=='Infinity'
        }

    }
}
</script>