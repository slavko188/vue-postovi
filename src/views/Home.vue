<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <form @submit.prevent="postNewImage" class="mb-5">
        <div class="form-group">
          <!-- <croppa
            v-model="imageReference"
            :width="400"
            :height="400"
            placeholder=" Ucitaj sliku"
          >
          </croppa> -->
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
import InstagramCard from "@/components/InstagramCard.vue";
import { ref, toRefs, computed, onMounted, onUnmounted } from "vue";
import store from "@/store";
import { db, storage } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

const cards = ref([]);
const newImageDescription = ref("");
let imageName = ref("");
const imageReference = ref(null);

function getPost() {
  const query = getDocs(collection(db, "posts")) //proveriti metodu .orderBy('posted_at, desc)
    .then((query) => {
      cards.value = [];
      query.forEach((doc) => {
        const data = doc.data();
        console.log(data);

        cards.value.push({
          id: doc.id,
          description: data.desc,
          email: store.currentUser,
          time: data.posted_at,
          url: data.url,
        });
      });
    });
}

onMounted(getPost);
onUnmounted(getPost);

function getImage() {
  //omotac oko callback funkcije
  return new Promise((resolve, error) => {
    imageReference.generateBlob((data) => {
      resolve(data);
    });
  });
}

function postNewImage() {
  getImage()
    .then((data) => {
      console.log(blobData);
      let imageName = "posts/" + store.currentUser + "/" + Date.now() + ".png";

      return getStorage().ref(imageName).put(blobData);
    })
    .then((result) => {
      return result.ref.getDownloadURL();
    })
    .then((url) => {
      console.log("javni link", url);
      const imageDescription = newImageDescription;

      return (postCollRef = addDoc(collection(db, "postovi"), {
        desc: newImageDescription,
        email: store,
        posted_at: Date.now(),
      }));
    })
    .then((doc) => {
      console.log("Spremljeno", doc);
      // sa ovim ponistavamo da u polje za unos kad se posalju podaci da ostane prazno.
      newImageDescription = ""; // sa ovim isto ponistavamo da posle unosa u input polje ostane prazno,kad se podaci posalju.
      imageReference.remove();

      getPost();
    })
    .catch((e) => {
      console.error(e);
    });

  const filteredCards = computed(() => {
    let termin = store.searchTerm;
    return cards.value.filter((card) => card.description.includes(termin));
  });
}
</script>
