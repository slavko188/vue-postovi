<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <form @submit.prevent="postNewImage" class="mb-5">
        <div class="form-group">
          <croppa
            ref="imageReference"
            :width="400"
            :height="400"
            placeholder=" Ucitaj sliku"
          ></croppa>
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <instagram-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
      />
    </div>
    <div class="col-2">sidebar</div>
  </div>
</template>

<script setup>
import { app } from "@/firebase";
import { ref, onMounted, onUnmounted, computed } from "vue";
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Croppa } from "vue-croppa";

let cards = ref([]);
const newImageUrl = ref("");
const newImageDescription = ref("");

onMounted(() => {
  getPost().value;
});

const getPost = async () => {
  const query = await getDocs(collection(db, "posts")) //proveriti metodu .orderBy('posted_at, desc)
    .then((query) => {
      let cards = [];
      query.forEach((doc) => {
        const data = doc.data();
        cards.push({
          id: doc.id,
          description: data.desc,
          email: store.currentUser,
          time: data.posted_at,
          url: data.url,
        });
      });
    })

    .catch((error) => {
      console.log("nijesu podaci isporuceni", error);
    });
};

const postNewImage = async () => {
  imageReference.value.generateBlob((blobData) => {
    console.log(blobData);
  });
  return;

  const postCollRef = await addDoc(collection(db, "posts"), {
    url: newImageUrl.value,
    desc: newImageDescription.value,
    email: store,
    posted_at: Date.now(),
  }).then((doc) => {
    console.log("Spremljeno", doc);
    newImageDescription.value = ""; // sa ovim ponistavamo da u polje za unos kad se posalju podaci da ostane prazno.
    newImageUrl.value = ""; // sa ovim isto ponistavamo da posle unosa u input polje ostane prazno,kad se podaci posalju.
  });
};

const filteredCards = computed(() => {
  let termin = store.searchTerm;
  return cards.value.filter((card) => card.description.includes(termin));
});
</script>
