<template>

    <page-layout>

        <div slot="content" class="main-content">
            <div class="content">

                <page-loader v-if="loader"></page-loader>

                <div v-else>
                    <pagination-top @changeAmountItems="getItems" ref="PaginationTop" :pagination-data="this.pagination"/>

                    <album-item ref="albumItem" @editItem="editItem" :open-item="openItem"  @deleteItem="deleteItem" v-for="(album,key) in this.albums" :album="album" :key="key">

                        <div slot="card-content" class="fadeIn animated">
                            <mdc-list two-line>
                                <mdc-list-item>
                                    <span>Songs:</span>
                                    <span slot="secondary">{{ album.songs }}</span>
                                </mdc-list-item>

                                <mdc-list-item>
                                    <span>Publisher:</span>
                                    <span slot="secondary">{{ album.publisher }}</span>
                                </mdc-list-item>

                                <mdc-list-item>
                                    <span>Released:</span>
                                    <span slot="secondary">{{ album.released }}</span>
                                </mdc-list-item>

                            </mdc-list>
                        </div>

                    </album-item>

                    <pagination-bottom @changePage="getItemsWithUrl" ref="PaginationBottom" :pagination-data="this.pagination"/>
                </div>


            </div>

            <mdc-snackbar v-model="snack"></mdc-snackbar>
            <mdc-dialog v-model="openDialog"
                        title="Title" @accept="addAlbum"  accept="Toevoegen" cancel="Annuleren">
            </mdc-dialog>
        </div>

    </page-layout>

</template>


<script>
    import PageLayout from './layout';
    import Loader from '../../components/loader';
    import PaginationBottom from '../../components/pagination/paginationBottom';
    import PaginationTop from '../../components/pagination/paginationTop';
    import Album from '../../models/Album';
    import AlbumItem from '../../components/albumItem';


    export default {
        name: "albums",
        data() {
            return {
                albums: [],
                pagination:{},
                loader: true,
                snack:{},
                openDialog: false,
                openItem:''
            }
        },
        components: {
            "page-layout": PageLayout,
            "page-loader": Loader,
            "album-item": AlbumItem,
            "pagination-bottom": PaginationBottom,
            "pagination-top": PaginationTop
        },
        beforeCreate() {
            let start = 1 + (this.$store.state.page * 5) - 5;
            let opened = this.$router.history.current.query;
            if(opened){
                this.openItem = opened.open;
            }
            Album.paginationStartAndLimit(start,5).then(result => {
                this.albums = result.data.items;
                this.pagination = result.data.pagination;
                this.loader = false;
            }).catch(err => {
                console.log(err);
            })
        },
        methods:{
            async addAlbum(){
                Swal(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )
            },
            async deleteItem($album){

                this.snack = {
                    message: 'Verwijder album' + $album.title,
                    actionText: 'bevestigen',
                    actionHandler: () => {
                        Album.delete($album._id).then(() => {
                            if(this.pagination.currentPage === this.$store.state.page && this.pagination.currentItems === 1){
                                this.$store.dispatch('setPage', this.$store.state.page - 1);
                            }
                            let start = (this.$store.state.page * 5) - 4;
                            Album.paginationStartAndLimit(start,5).then(result => {
                                this.setAllData(result.data);
                            }).catch(err => {
                                console.log(err);
                            });
                        });

                        this.snack = {
                            message: 'Album is verwijderd',
                            actionText: 'Ok',
                            actionHandler: this.test
                        };
                    }
                }

            },
            async editItem($album){
                this.openDialog = true;

            },
            setAllData(data){
                this.albums = data.items;
                this.pagination = data.pagination;
                this.$store.dispatch('setPage', this.pagination.currentPage);
                this.$refs.PaginationBottom.setPaginationData(this.pagination);
                this.$refs.PaginationTop.setPaginationData(this.pagination);
            },
            getItems(limit){
                // let amount = Number(limit);
                let amount = 5;
                if(!isNaN(amount)){
                    Album.paginationLimit(amount).then(result => {
                        this.setAllData(result.data);

                    }).catch(err => {
                        console.log(err);
                    })
                }else{
                    Album.all().then(result => {

                        this.setAllData(result.data);

                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            getItemsWithUrl(url){
                this.$refs.albumItem.forEach((item) => {
                    item.closeDetail();
                });

                Album.pagination(url).then(result => {
                    this.setAllData(result.data);

                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style scoped>

</style>