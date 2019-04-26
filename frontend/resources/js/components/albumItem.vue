<template>
    <mdc-card class="album-item-card">
        <mdc-card-header
                :title="this.album.title"
                :subtitle="this.album.artist" >
        </mdc-card-header>


        <slot name="normal-card-content"></slot>

        <mdc-card-text v-if="showDetails">
            <slot name="card-content"></slot>
        </mdc-card-text>


        <mdc-card-actions>
            <mdc-card-action-buttons >
                <slot name="submit"></slot>
                <mdc-button v-if="!noDetail" @click="openDetails">{{ message[String(showDetails)] }}</mdc-button>

            </mdc-card-action-buttons>

            <mdc-card-action-icons v-if="!noActions">
                <mdc-card-action-icon @click="$router.push({name:'album',params:{id:album._id}})" icon="build" />
                <mdc-card-action-icon @click="$emit('deleteItem',album)" icon="delete" />
            </mdc-card-action-icons>
        </mdc-card-actions>
    </mdc-card>
</template>

<script>
    export default {
        name: "albumItem",
        props: {
            album:{
                type:Object
            },
            noDetail:{
                type:Boolean,
                default: false
            },
            noActions:{
                type:Boolean,
                default: false
            },
            openItem:{
                type:String,
                default: ''
            }

        },
        created(){
            console.log(this.openedItem);
            console.log(this.album._id);
            if(this.openItem === this.album._id){
                this.showDetails = true;
            }
        },
        data(){
            return{
                showDetails:false,
                openedItem: this.openItem,
                message:{
                    'true': 'Close',
                    'false': 'Show More'
                }
            }
        },
        methods:{
            openDetails(){
                this.showDetails = !this.showDetails;

                console.log(String(this.showDetails))
            },
            closeDetail(){
                this.showDetails = false;
            }
        }
    }
</script>

<style scoped>

</style>