import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (patient: {}) => {
    return http.post(API_ROUTES.PATIENT_POST, patient);
};

const findById = async (id: any) => {
    return http.get(API_ROUTES.PATIENT_GET + id);
};

const findAll = async () => {
    return await http.get(API_ROUTES.PATIENT_ALL);
};

const deleteById = async (id: bigint) => {
    return http.delete(API_ROUTES.PATIENT_DELETE + id);
};

const findAllByAllColumn = async (data: { pageNumber: number, pageSize: number, text: string }) => {
    return http.post(API_ROUTES.PATIENT_ADVANCE_SEARCH, data);
};

const uploadProfile = async (image64: String) => {
    return http.post(API_ROUTES.PATIENT_UPLOAD_PROFILE, {fileContentBase64: image64});
};
const uploadFinger = async (finger: any) => {
    return http.post(API_ROUTES.PATIENT_UPLOAD_FINGER, finger);
};

const findByProfile = async (id: any) => {
    return http.get(API_ROUTES.PATIENT_PROFILE_GET.replace(':id', id));
};

const uploadProfileById = async (id: any, image64: String) => {
    return http.post(API_ROUTES.PATIENT_UPLOAD_PROFILE_BY_ID.replace(':id', id), {fileContentBase64: image64});
};

const uploadXrayById = async (id: any, image64: String) => {
    return http.post(API_ROUTES.PATIENT_UPLOAD_XRAY_BY_ID.replace(':id', id), {fileContentBase64: image64});
};

const uploadFingerById = async (id: any, image64: String) => {
    return http.post(API_ROUTES.PATIENT_UPLOAD_FINGER_BY_ID.replace(':id', id), {fileContentBase64: image64});
};
const search = async (text: string) => {
    return http.get(API_ROUTES.PATIENT_SEARCH.replace(':query', text));
};

const findByPassport = async (passport: string) => {
    return http.get(API_ROUTES.PATIENT_BY_PASSPORT.replace(':passport', passport));
};

const PatientService = {
    save,
    uploadProfileById,
    uploadFingerById,
    findByProfile,
    findById,
    findAll,
    search,
    deleteById,
    findAllByAllColumn,
    uploadProfile,
    uploadFinger,
    uploadXrayById,
    findByPassport,
}
export default PatientService;
