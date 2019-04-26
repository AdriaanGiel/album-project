<template>
    <mdc-layout-grid v-if="pagination.totalPages > 1">

        <mdc-layout-cell class="center-text" desktop=3 tablet=2 phone=1>
            <mdc-button @click="getPaginationUrl(pagination._links.first.href)">
                First
            </mdc-button>

        </mdc-layout-cell>

        <mdc-layout-cell class="center-text" desktop=6 tablet=4 phone=2>
            <mdc-button v-if="pagination._links.previous.page > 0 && pagination._links.previous.page !== pagination.currentPage" @click="getPaginationUrl(pagination._links.previous.href)">{{ pagination._links.previous.page }}</mdc-button>
            <span>{{ pagination.currentPage }}</span>
            <mdc-button v-if="pagination._links.next.page <= pagination.totalPages && pagination.currentPage !== pagination.totalPages" @click="getPaginationUrl(pagination._links.next.href)">{{ pagination._links.next.page }}</mdc-button>
        </mdc-layout-cell>

        <mdc-layout-cell class="center-text" desktop=3 tablet=2 phone=1>
            <mdc-button @click="getPaginationUrl(pagination._links.last.href)">
                Last
            </mdc-button>
        </mdc-layout-cell>

    </mdc-layout-grid>
</template>

<script>
    export default {
        name: "paginationBottom",
        props:['paginationData'],
        data(){
            return{
                pagination:{}
            }
        },
        created(){
            console.log(this.paginationData);
          this.pagination = this.paginationData;
        },
        methods:{
            getPaginationUrl(url){
                this.$emit('changePage',url);
                console.log(url)
            },
            setPaginationData(data)
            {
                console.log(data);
                this.pagination = data;
            }
        }
    }
</script>

<style scoped>

</style>