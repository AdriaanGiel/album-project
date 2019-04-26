<template>
    <mdc-layout-grid>

        <mdc-layout-cell class="center-text" desktop=6 tablet=4 phone=2>

            <mdc-text typo='button' tag="span" adjust-margin>Current {{pagination.currentItems}}</mdc-text>

        </mdc-layout-cell>

        <mdc-layout-cell class="center-text" desktop=6 tablet=4 phone=2>

            <mdc-text typo='button' tag="span" adjust-margin>Total {{pagination.totalItems}}</mdc-text>

        </mdc-layout-cell>

        <!--<mdc-layout-cell class="center-text" desktop=3 tablet=2 phone=1>-->
            <!--<mdc-menu-anchor>-->
                <!--<mdc-button raised @click="open=true">{{this.text}}</mdc-button>-->
                <!--<mdc-menu v-model="open" @select="onSelect" @cancel="onCancel">-->
                    <!--<mdc-menu-item>5</mdc-menu-item>-->
                    <!--<mdc-menu-item>10</mdc-menu-item>-->
                    <!--<mdc-menu-item>15</mdc-menu-item>-->
                    <!--<mdc-menu-item>All</mdc-menu-item>-->
                <!--</mdc-menu>-->
            <!--</mdc-menu-anchor>-->
        <!--</mdc-layout-cell>-->

    </mdc-layout-grid>
</template>

<script>
    export default {
        name: "paginationTop",
        props: ["paginationData"],
        data() {
            return {
                open: false,
                text: "Per page all",
                pagination: {}
            }
        },
        created() {
            this.pagination = this.paginationData;
        },
        methods: {
            getPaginationUrl(url) {
                console.log(url)
            },
            onSelect(selected) {
                this.$emit('changeAmountItems', selected.item.innerHTML);
                if(isNaN(Number(selected.item.innerHTML))){
                    this.pagination.currentItems = this.pagination.totalItems;
                }
                this.text = `Per page ${selected.item.innerHTML}`;
            },
            onCancel() {},
            setPaginationData(data)
            {
                this.pagination = data;
                console.log(data);
            }

        }
    }
</script>

<style scoped>

</style>