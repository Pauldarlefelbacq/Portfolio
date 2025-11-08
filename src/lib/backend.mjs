import Pocketbase from "pocketbase";

const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL || "https://portfolio.pauldarlef.fr:443");
export default pb;
pb.autoCancellation(false);

export async function getAllProjets(){
    let records = await pb.collection("Projets").getFullList({ filter: 'corbeille = false',});
    records = records.map((item) => {
        item.imgR = item.img?.map(filename => pb.files.getURL(item, filename)) || [];
        return item;
    });
    return records;
};

export async function getAllProjetsCorbeille(){
    let records = await pb.collection("Projets").getFullList({ filter: 'corbeille = true',});
    records = records.map((item) => {
        item.imgR = item.img?.map(filename => pb.files.getURL(item, filename)) || [];
        return item;
    });
    return records;
};