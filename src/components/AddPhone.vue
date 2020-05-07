<template>
    <div class="add-phone container">
        <h2 class="center-align indigo-text">Add New Phone Number</h2>
        <form @submit.prevent="AddPhone">
            <div class="field title">
                <label for="title">Họ và Tên:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing,index) in ingredients" :key="index" class="field">
                <label for="ingredient">Số điện thoại:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Thêm số khác:</label>
                <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Lưu</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
    export default {
         name:'AddPhone',
         data () {
            return {
                title: null,
                another:null,
                ingredients:[],
                feedback: null,
                slug: null
            }
        },
        methods: {
             AddPhone () {
                // console.log(this.title,this.ingredients);
                if(this.title){
                    this.feedback = null
                    //create a slug
                    this.slug = slugify(this.title,{
                        replacement:'-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower:true
                    })
                    db.collection('phones').add({
                        title:this.title,
                        ingredients:this.ingredients,
                        slug: this.slug
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
                    this.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                }
                else {
                    this.feedback = "Bạn phải nhập số điện thoại để thêm"
                }
            },
             deleteIng(ing) {
                this.ingredients = this.ingredients.filter(ingredient => {
                    return ingredient != ing
                })
            }
        }
    }
</script>

<style >

.add-phone {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-phone h2 {
    font-size: 2em;
    margin: 20px auto;
}
.add-phone .field {
    margin: 20px auto;
    position: relative;

}
.add-phone .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}
</style>