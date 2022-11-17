<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
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
        :key="card.url"
        :info="card"
      />
    </div>
    <div class="col-2">sidebar</div>
  </div>
</template>

<script>
import { ref } from "vue";
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { computed } from "@vue/runtime-core";

export default {
  name: "home",
  setup() {
    let store = ref("");
    let cards = ref([
      {
        url: "http://picsum.photos/id/3/400/400",
        description: "ovo je slika planine",
        time: "two minits ago",
      },
    ]);
    const newImageUrl = ref("");
    const newImageDescription = ref("");

    const getPost = () => {
      const query = getDocs(collection(db, "posts"))
        .then((query) => {
          query.forEach((doc) => {
            console.log("ID:", doc.id, "=>", "Podaci", doc.data());
          });
          console.log(query);
        })

        .catch((error) => {
          console.log("nijesu podaci isporuceni", error);
        });
    };

    const postNewImage = () => {
      const imageUrl = newImageUrl;
      const imageDescription = newImageDescription;

      const postCollRef = addDoc(collection(db, "posts"), {
        url: imageUrl,
        desc: imageDescription,
        email: store.currentUser,
        posted_at: Date.now(),
      })
        .then((doc) => {
          console.log("Spremljeno", doc);
          newImageDescription.value = ""; // sa ovim ponistavamo da u polje za unos kad se posalju podaci da ostane prazno.
          newImageUrl.value = ""; // sa ovim isto ponistavamo da posle unosa u input polje ostane prazno,kad se podaci posalju.
        })
        .catch((error) => {
          console.log("Dobili ste gresku", error);
        });
    };

    const filteredCards = () => {
      let termin = store.value.searchTerm;
      return cards.value.filter((card) => card.description.includes(termin));
    };

    return {
      cards: [],
      store,
      getPost,
      postNewImage,
      filteredCards,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
};
</script>
