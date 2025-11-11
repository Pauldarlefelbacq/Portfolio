import Pocketbase from "pocketbase";

const pb = new Pocketbase("https://portfolio.pauldarlef.fr:443");
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

export async function getAllSkills() {
    let records = await pb.collection("Skills").getFullList();
    records = records.map((item) => {
        item.logoUrl = pb.files.getURL(item, item.logo);
        return item;
    });
    return records;
};

export async function loginUser(username, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(username, password);
        return { success: true, user: authData.record };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export function logoutUser() {
    pb.authStore.clear();
};

export function getCurrentUser() {
    return pb.authStore.model;
};

export function isAuthenticated() {
    return pb.authStore.isValid;
};

// CRUD Projets
export async function createProjet(data) {
    try {
        const record = await pb.collection('Projets').create(data);
        return { success: true, record };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export async function updateProjet(id, data) {
    try {
        const record = await pb.collection('Projets').update(id, data);
        return { success: true, record };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export async function deleteProjet(id) {
    try {
        await pb.collection('Projets').delete(id);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export async function getProjetById(id) {
    try {
        const record = await pb.collection('Projets').getOne(id);
        return { success: true, record };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export async function moveToTrash(id) {
    try {
        const record = await pb.collection('Projets').update(id, { corbeille: true });
        return { success: true, record };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export async function restoreFromTrash(id) {
    try {
        const record = await pb.collection('Projets').update(id, { corbeille: false });
        return { success: true, record };
    } catch (error) {
        return { success: false, error: error.message };
    }
};