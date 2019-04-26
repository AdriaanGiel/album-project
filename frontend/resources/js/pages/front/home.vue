<template>
    <div>
        <h1>dsknkofsdnkfdn</h1>
    </div>
</template>

<script>
    import Product from '../../models/Product';
    export default {
        name: "home",
        beforeCreate(){
            Product.all().then((result) => {
                console.log(result);
            })
        }
    }
</script>

<style scoped>
</style>