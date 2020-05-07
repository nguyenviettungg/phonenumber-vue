<template>
     <div v-if="phone" class="edit-phone container">
        <h2>Edit {{ phone.title }}</h2>
        <form @submit.prevent="EditPhone">
            <div class="field title">
                <label for="title">Họ và Tên:</label>
                <input type="text" name="title" v-model="phone.title">
            </div>
            <div v-for="(ing,index) in phone.ingredients" :key="index" class="field">
                <label for="ingredient">Số điện thoại:</label>
                <input type="text" name="ingredient" v-model="phone.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Thêm số khác:</label>
                <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Sửa</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify'
    export default {
        name:'EditPhone',
        data() {
            return {
                phone: null,
                another: null,
                feedback: null
            }
        },
        created() {
            let ref = db.collection('phones').where('slug','==',this.$route.params.phone_slug)
            ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    // console.log(doc.data());
                    this.phone = doc.data()
                    this.phone.id = doc.id
                    
                })
            })
        },
        methods:{
            EditPhone(){
                 if(this.phone.title){
                    this.feedback = null
                    //create a slug
                    this.phone.slug = slugify(this.phone.title,{
                        replacement:'-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower:true
                    })
                    db.collection('phones').doc(this.phone.id).update({
                        title:this.phone.title,
                        ingredients:this.phone.ingredients,
                        slug: this.phone.slug
                    }).then(() => {
                        this.$router.push({name:'Index'})
                    }).catch(err => {
                        console.log(err);
                        
                    })
                }
                else {
                    this.feedback = "Vui lòng nhập họ & tên"
                }
            },
            addIng () {
                if(this.another){
                    this.phone.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                }
                else {
                    this.feedback = "Bạn phải nhập số điện thoại để thêm"
                }
            },
            deleteIng(ing) {
                this.phone.ingredients = this.phone.ingredients.filter(ingredient => {
                    return ingredient != ing
                })
            }
        }
    }
</script>

<style>
.edit-phone {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-phone h2 {
    font-size: 2em;
    margin: 20px auto;
}
.edit-phone .field {
    margin: 20px auto;
    position: relative;

}
.edit-phone .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}
</style>