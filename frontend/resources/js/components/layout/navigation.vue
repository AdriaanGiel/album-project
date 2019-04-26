<template>
    <div>
        <mdc-top-app-bar :fixed="true" title="Album App" event="nav" dense>
            <mdc-top-app-bar-action icon="help"></mdc-top-app-bar-action>


        </mdc-top-app-bar>
        <mdc-drawer toggle-on="nav" temporary>
            <mdc-drawer-list>
                <mdc-drawer-item href="/albums" >Albums</mdc-drawer-item>
                <mdc-drawer-item href="/albums/create" >Create Album</mdc-drawer-item>
            </mdc-drawer-list>
        </mdc-drawer>
    </div>

</template>

<script>
    export default {
        name: "navigation"
    }
</script>

<style scoped>

</style>