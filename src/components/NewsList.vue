<template>
    <div class="news-component">
        <ul class="content">
            <li style="background-image: url(https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2Fnews%2Fnews_1.jpg?alt=media&token=ce687526-93ad-45f2-bb54-2df499171e87);">
                <h3>Looking for video setup?</h3>
            </li>
            <li style="background-image: url(https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2Fnews%2Fnews_2.jpg?alt=media&token=85a3ccdc-39a0-45dc-a809-fa3de14c8d64);">
                <h3>Up close with new cameras.</h3>
            </li>
            <li style="background-image: url(https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2Fnews%2Fnews_3.jpg?alt=media&token=b43dc7ea-b2fe-4b2c-8ac0-63281a3cb936);">
                <h3>Meet the RF mount Canon EOS C70.</h3>
            </li>
            <li style="background-image: url(https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2Fnews%2Fnews_4.jpg?alt=media&token=6f4a54b4-4d94-4a95-8f5e-c54338a8a3c6);">
                <h3>Join the Canon academy.</h3>
            </li>
        </ul>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
div{
    width: 100%;
    height: fit-content;
}
.content{
    width: 1020px;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    justify-content: center; 
    margin: 30px auto;
}
li{
    list-style-type: none;
    width: 480px;
    min-width: 300px;
    height: 300px;
    margin: 15px;
    background-repeat: no-repeat;
    background-size: cover ;
    background-position-x: 50%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-end;
    transition: all 0.25s linear;

}
ul:hover li:not(:hover) { 
  opacity: 0.7;;
}
h2{
    font-size: 25px;
    font-weight: 400;
}
h3{
    width: fit-content;
    height: fit-content;
    padding: 7px 7px;
    margin: 0 0 7px 7px;
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    background-color: rgba(0, 0, 0, 0.445);
}

@media only screen and (max-width: 1020px){
    .content{
        flex-direction: column;
        width: fit-content;
    }
    li:first-child{
        margin: 0 auto 15px auto;
    }
}    
@media only screen and(max-width:500px) {
    .content{
        width: 100%;
        margin: 0px 0;
    }
    li{
        width: 100%;
        margin: 15px 0;
    } 
}
</style>