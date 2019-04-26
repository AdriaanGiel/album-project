<template>
    <div @dblclick="changeState">
        <mdc-textfield   style="width: 100%" v-model="value" :disabled="fieldDisabled"  :label="label"  box/>
    </div>
</template>

<script>
    export default {
        name: "textToForm",
        props: ['label','value'],
        data(){
            return {
                fieldDisabled: true,
                state: false
            }
        },
        methods:{
            changeState(){
                this.fieldDisabled = !this.fieldDisabled;
            }
        }
    }
</script>

<style scoped>

</style>