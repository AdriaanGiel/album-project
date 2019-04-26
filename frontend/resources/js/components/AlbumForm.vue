<template>

    <mdc-card class="album-item-card">
        <mdc-card-header
                :title="this.title"
                :subtitle="this.description" >
        </mdc-card-header>

        <mdc-card-text>
            <form>
                <mdc-textfield :fullwidth="true" v-model="album.title" label="Titel" outline />
                <mdc-textfield :fullwidth="true" v-model="album.artist" label="Artiest" outline />
                <mdc-textfield :fullwidth="true" v-model="album.songs" label="Liedjes" outline />
                <mdc-textfield :fullwidth="true" v-model="album.publisher" label="Uitgever" outline />
                <mdc-textfield :fullwidth="true" v-model="album.released" label="Datum" outline />
            </form>
        </mdc-card-text>

        <mdc-card-actions>
            <mdc-card-action-buttons>

                <slot name="buttons"></slot>

            </mdc-card-action-buttons>
        </mdc-card-actions>

    </mdc-card>

</template>

<script>
    export default {
        name: "AlbumForm",
        props: ['albumData','title','description'],
        data(){
            return{
                album:{
                    title:"",
                    artist:"",
                    songs:"",
                    publisher:"",
                    released:""
                }
            }
        },
        methods:{
          getAlbum()
          {
              return this.album
          }
        },
        created(){
            if(this.albumData){
                this.album = this.albumData;
            }
        }
    }
</script>

<style scoped>

</style>