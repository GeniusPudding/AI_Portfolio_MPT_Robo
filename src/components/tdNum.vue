<template>
    <td :class="{minus: content< 0}">
        {{numFormat(content)}}
    </td>
</template>
<script>
export default {
    props: {content:Number, numFormat:Function}
}
</script>