<template>
    <div class="contact-component">
        <h1>
            <h2>How can we help you?</h2>
            <h3>We are here to help you answer your questions, address issues, and get you to the right place if you need a fix.</h3>
        </h1>
        <div>
            <h4>We repair cameras, lenses, flashes, video cameras, and projectors.</h4>
            <p>There is nothing quite as frustrating as having your camera go down. Whether there was an accident or something has just stopped working, a broken camera can be a great disappointment.That is where we come in. We will work with you to see your camera repaired and returned to you in the quickest time possible. </p>
            <p>However, many repair issues take 4-6 weeks. Our repair facility can handle virtually every type of camera and repair issue. Whether you are using film or digital, Tuttle Cameras is the place to bring your camera repair issue.We can clean your digital SLR sensor usually in 24 hours, so bring in your digital SLR and make sure your sensor is spotless before your next vacation or photo shoot.</p>
        </div>

        <form>
            <h2>CONTACT US</h2>
            <div class="form-inner">
                <div class="input-holder">
                    <input class="input-text" name="name" type="text"  required>
                    <span class="label">Name</span>
                </div>
                <div class="input-holder">
                    <input class="input-text" name="email" type="text"  required>
                    <span class="label">Email</span>
                </div>
                <div class="input-holder">
                    <textarea class="input-text" name="message" type="text"  required/>
                    <span class="label">Message</span>
                </div>
            </div>      
            <button class="send">Send Message</button>
            
        </form>

    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.contact-component{
    height: fit-content;
    width: 100%;
}
h1{
    color: #fff;
    margin: 0 auto;
    width: 100%;
    height: 700px;
    object-fit: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/eshop-86301.appspot.com/o/images%2FRepair-1%20(1).jpg?alt=media&token=7d1254bf-d9bb-4d9b-b2b3-df4d66270fe8");
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
h2{
    background-color: rgba(0, 0, 0, 0.26);
    padding:10px 0;
    font-weight: 300;
    height: fit-content;
    width: 100%;
    margin: 0 auto;
}
form h2{
    background-color: transparent;
    font-size: 26px;
    font-weight: 400;
}
h3{
    font-size: 24px;
    background-color: rgba(0, 0, 0, 0.26);
    padding:10px ;
    text-shadow: 0 0 5px black;
    font-weight: 300;
    width: fit-content;
    margin: 0 auto;
}
h4{
    font-size: 22px;
    padding-top: 30px;
    width: fit-content;
    margin: 0 auto;
}
p{
    text-align: left;
    margin: 30px auto;
    max-width: 900px;

}

.send{
    font-size: 17px;
    padding:8px 12px;
    margin:8px auto 25px auto;
    border:2px solid #fff;
    border-radius: 5px;
    width: 250px;
    background:rgb(204,0,0);
    color:#fff;
    cursor:pointer;
    transition: .25s;
    
}
button:hover{
    transform: scale(1.05);
    

}
.number{
    margin: 15px auto;
    width: fit-content;
}

form{
    margin: 40px auto 0 auto;
    max-width: 400px;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    font-size: 17px;

}
.form-inner{
    padding: 20px;

}
.input-holder{
    position: relative;
    margin-bottom: 25px;
}
.input-text{
    font-family: 'Lato', Avenir, Helvetica, Arial, sans-serif;
    border: none;
    overflow: auto;
    outline: none;
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 17px;

}
.label{
    position: absolute;
    pointer-events: none;
    transition: .2s ease all;
    color: #000;
    top: 8px;
    left: 0;
    margin: 0 auto;
}
input:focus{
    outline: 0;
}
input:focus ~ .label,
input:not(:focus):valid ~ .label,
textarea:focus ~ .label,
textarea:not(:focus):valid ~ .label{
    top: -12px;
    left: 0;
    font-size: 14px;
}
textarea{
    min-height: 100px;
    padding: 15px 0;
}

@media only screen and (max-width: 1600px){
    h1{
        height: 650px;
    }
}
@media only screen and (max-width: 1400px){
    h1{
        height: 500px;
    }
}
@media only screen and (max-width: 900px){
    p,h4{
        margin: 10px;
    }
}
</style>