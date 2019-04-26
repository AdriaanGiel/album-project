<template>
    <mdc-layout-app>

        <navigation></navigation>

        <main>
            <slot name="content"></slot>
        </main>

        <slot name="footer"></slot>

    </mdc-layout-app>
</template>

<script>
    import Navigation from '../../components/layout/navigation';
    export default {
        name: "layout",
        components:{
            Navigation
        }
    }
</script>

<style scoped>

</style>