<template>

    <page-layout>
        <div slot="content" class="main-content">
            <div class="content">
                <album-form title="Aanmaken" ref="AlbumForm" description="Nieuwe album toevoegen">
                    <mdc-button slot="buttons" @click="createNewAlbum" :disabled="buttonDisabled">Aanmaken</mdc-button>
                </album-form>
            </div>


        </div>
    </page-layout>



</template>

<script>
    import Swal from 'sweetalert2/dist/sweetalert2.js';
    import PageLayout from './layout';
    import AlbumForm from "../../components/AlbumForm";
    import Album from '../../models/Album';

    export default {
        name: "create",
        data(){
          return{
              buttonDisabled: false,
            }
        },
        components: {
            "album-form": AlbumForm,
            "page-layout": PageLayout
        },
        methods:{
            createNewAlbum(){
                let data = this.$refs.AlbumForm.getAlbum();
                Album.create(data).then(result => {
                    Swal(
                        'Success!',
                        'Nieuw album is toegevoegd!',
                        'success'
                    ).then(res => {
                        this.$store.dispatch('setPage', 1);
                        this.$router.push({path:`/albums?open=${result.data._id}`});

                    })
                });

            }
        }
    }
</script>

<style scoped>

</style>