<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <form @submit.prevent="postNewImage" class="mb-5">
        <div class="form-group">
          <croppa
            :width="400"
            :height="400"
            placeholder=" Ucitaj sliku"
            v-model="imageReference"
          >
            {{ Ucitaj }} sliku</croppa
          >
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

<script>
import { ref, toRefs, reactive, computed, onMounted, onUnmounted } from "vue";
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db, storage } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

export default {
  name: "home",

  components: {
    InstagramCard,
  },
  setup() {
    const state = reactive({
      imageReference: null,
      newImageUrl: "",
      newImageDescription: "",
      cards: [],
    });

    const getPost = () => {
      const query = getDocs(collection(db, "drustvena-mreza")) //proveriti metodu .orderBy('posted_at, desc)
        .then((query) => {
          state.cards = [];
          query.forEach((doc) => {
            const data = doc.data();
            state.cards.push({
              id: doc.id,
              description: data.desc,
              email: store.currentUser,
              time: data.posted_at,
              url: data.url,
            });
          });
        });
    };

    onMounted(getPost);
  },
  getImage() {
    //omotac oko callback funkcije
    return new Promise((resolve, error) => {
      imageReference.value.generateBlob((data) => {
        resolve(data);
      });
    });
  },
};

const postNewImage = async () => {
  try {
    let blobData = await getImage().value;
    let imageName = "post/" + store.currentUser + "/" + Date.now();
    let result = await getStorage()
      .storageRef(storage, imageName)
      .put(blobData);
    let url = await result.storageRef().getDownloadURL(); //promise

    const imageDescription = newImageDescription;

    const postCollRef = await addDoc(collection(db, "drustvena-mreza"), {
      url: newImageUrl.value,
      desc: newImageDescription.value,
      email: store,
      posted_at: Date.now(),
    });
    console.log("Spremljeno", doc);
    // sa ovim ponistavamo da u polje za unos kad se posalju podaci da ostane prazno.
    newImageDescription.value = ""; // sa ovim isto ponistavamo da posle unosa u input polje ostane prazno,kad se podaci posalju.

    getPost().value;
  } catch (e) {
    console.error("Greska", e);
  }

  const filteredCards = computed(function () {
    let termin = store.searchTerm;
    return cards.value.filter((card) => card.description.includes(termin));
  });

  return {
    cards,
    store,
    filteredCards,
    getPost,
    postCollRef,
    getImage,
    getPost,
    ...toRefs(state),
  };
};
</script>
