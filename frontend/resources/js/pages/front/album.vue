<template>
    <page-layout>

        <div slot="content" class="main-content">

            <page-loader v-if="!album._id"></page-loader>

            <div v-else class="content">
                <mdc-card class="album-item-card">
                    <mdc-card-header title="Bewerk album"></mdc-card-header>


                    <mdc-card-text>
                        <mdc-textfield   style="width: 100%" v-model="album.title" label="Titel"  box/>
                        <mdc-textfield   style="width: 100%" v-model="album.artist"  label="Artiest"  box/>
                        <mdc-textfield   style="width: 100%" v-model="album.songs"   label="Liedjes"  box/>
                        <mdc-textfield   style="width: 100%" v-model="album.publisher"  label="Uitgever"  box/>
                        <mdc-textfield   style="width: 100%" v-model="album.released"   label="Release Datum"  box/>
                    </mdc-card-text>


                    <mdc-card-actions>
                        <mdc-card-action-buttons>
                            <mdc-button :disabled="submitDisable"  @click="editAlbum">Verstuur</mdc-button>
                            <mdc-card-action-icon v-if="revert" @click="revertAlbum" icon="undo"/>
                        </mdc-card-action-buttons>
                    </mdc-card-actions>
                </mdc-card>

            </div>

        </div>

    </page-layout>
</template>

<script>
    import Album from '../../models/Album';
    import PageLayout from './layout';
    import Loader from '../../components/loader';
    import AlbumItem from '../../components/albumItem';
    import TextForm from '../../components/textToForm';

    let backUp;

    export default {
        name: "album",
        metaInfo:{
            title: 'Album Detail'
        },
        components:{
            "page-layout": PageLayout,
            "page-loader": Loader,
            "album-item": AlbumItem,
            "text-form": TextForm
        },
        data()
        {
            return{
                album:{},
                backupAlbum: {},
                submitDisable:false,
                revert: false
            }
        },
        beforeCreate()
        {
           Album.find(this.$route.params.id).then(result => {
                this.album = result.data;
                this.backupAlbum = this.$store.state.albums.find((album) => {
                    return this.album._id === album.id
                });
                if(this.backupAlbum){
                    this.revert = true;
                }
                backUp = JSON.stringify(result.data);
           }).catch(err => {
               console.log(err);
           });
        },
        methods:{
            editAlbum(){
                this.submitDisable = true;
                Album.update(this.album._id,this.album).then(res => {

                    this.$store.dispatch('setAlbum',{
                        id: this.album._id,
                        new: this.album,
                        backup: JSON.parse(backUp)
                    });

                    this.backupAlbum = this.$store.state.albums.find((album) => {
                        return this.album._id === album.id
                    });

                    this.revert = true;

                    Swal(
                        'Success!',
                        'Het bewerken is gelukt!',
                        'success'
                    ).then(res => {
                        this.submitDisable = false;
                    })
                }).catch(err => {
                    console.log(err)
                });
            },
            revertAlbum(){
                Album.update(this.album._id,this.backupAlbum.backup).then(res => {
                    this.$store.dispatch('removeAlbum',this.backupAlbum.id);
                    this.album = res.data.data;
                    this.revert = false;
                    Swal(
                        'Success!',
                        'Het terug zetten is gelukt!',
                        'success'
                    ).then(res => {
                        this.submitDisable = false;
                    })
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>

</style>