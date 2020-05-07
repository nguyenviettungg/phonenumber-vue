<template>
  <div class="index container">
    <div class="card" v-for="phone in phones" :key="phone.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deletePhone(phone.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ phone.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in phone.ingredients" :key="index">
            <span class="chip"> {{ ing }} </span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{ name: 'EditPhone', params: { phone_slug: phone.slug } }"
        >
          <i class="material-icons">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      phones: [],
    };
  },
  methods: {
    deletePhone(id) {
      //delete doc from firestore
      db.collection("phones")
        .doc(id)
        .delete()
        .then(() => {
          this.phones = this.phones.filter((phone) => {
            return phone.id != id;
          });
        });
    },
  },
  created() {
    // fetch data from the firestore
    db.collection("phones")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log(doc.data(),doc.id);
          let phone = doc.data();
          phone.id = doc.id;
          this.phones.push(phone);
        });
      });
  },
};
</script>

<style >
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index ul.ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
