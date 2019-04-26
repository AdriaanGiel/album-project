<template>
    <page-layout>
        <div slot="content" class="main-content">
            <div class="content">

                <page-loader v-if="!album.title" />

                <album-form v-else :album-data="album" title="Wijzigen" ref="AlbumForm" description="Album wijzigen">
                    <mdc-button slot="buttons" @click="updateAlbum" :disabled="buttonDisabled">Opslaan</mdc-button>
                </album-form>
            </div>

        </div>
    </page-layout>
</template>

<script>
    import Swal from 'sweetalert2';
    import PageLayout from './layout';
    import AlbumForm from "../../components/AlbumForm";
    import Album from '../../models/Album';
    import Loader from '../../components/loader';
    export default {
        name: "update",
        data(){
            return{
                buttonDisabled: false,
                album:{}
            }
        },
        beforeCreate(){

            Album.find(this.$route.params.id).then((result) => {
                this.album = result.data;
            }).catch(err => {
                console.log(err)
            })
        },
        components: {
            "album-form": AlbumForm,
            "page-layout": PageLayout,
            "page-loader": Loader
        },
        methods:{
            updateAlbum()
            {
                this.buttonDisabled = true;
                let newData = JSON.parse(JSON.stringify(this.$refs.AlbumForm.getAlbum()));

                Album.update(this.album._id, newData).then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>

</style>