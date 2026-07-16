import api from "./axios";

export const authAPI = {
  // POST /api/auth/login  { email, password } -> { token, role, email, fullName, studentId, companyId }
  login: (email, password) =>
    api.post("/auth/login", { email, password }).then((r) => r.data),

  // POST /api/auth/register  { fullName, email, password, role }
  register: (body) => api.post("/auth/register", body).then((r) => r.data),
};

// STUDENTS
export const studentAPI = {
  getAll: () => api.get("/students").then((r) => r.data),
  getById: (id) => api.get(`/students/${id}`).then((r) => r.data),
  create: (body) => api.post("/students", body).then((r) => r.data),
  update: (id, body) => api.put(`/students/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/students/${id}`).then((r) => r.data),
};

// COMPANIES
export const companyAPI = {
  getAll: () => api.get("/companies").then((r) => r.data),
  getById: (id) => api.get(`/companies/${id}`).then((r) => r.data),
  create: (body) => api.post("/companies", body).then((r) => r.data),
  update: (id, body) => api.put(`/companies/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/companies/${id}`).then((r) => r.data),
};

// JOB POSTINGS
export const jobAPI = {
  getAll: (page = 0, size = 100) =>
    api.get(`/job-postings?page=${page}&size=${size}`).then((r) => r.data),
  getById: (id) => api.get(`/job-postings/${id}`).then((r) => r.data),
  create: (body) => api.post("/job-postings", body).then((r) => r.data),
  update: (id, body) =>
    api.put(`/job-postings/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/job-postings/${id}`).then((r) => r.data),
};

// APPLICATIONS ──────────────────────────────────────────────
export const applicationAPI = {
  getAll: () => api.get("/applications").then((r) => r.data),
  getById: (id) => api.get(`/applications/${id}`).then((r) => r.data),
  create: (body) => api.post("/applications", body).then((r) => r.data),
  update: (id, body) =>
    api.put(`/applications/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/applications/${id}`).then((r) => r.data),
};

// NOTICES
export const noticeAPI = {
  getAll: () => api.get("/notices").then((r) => r.data),
  getById: (id) => api.get(`/notices/${id}`).then((r) => r.data),
  create: (body) => api.post("/notices", body).then((r) => r.data),
  update: (id, body) => api.put(`/notices/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/notices/${id}`).then((r) => r.data),
};

// PLACEMENT RECORDS
export const placementAPI = {
  getAll: () => api.get("/placement-records").then((r) => r.data),
  getById: (id) => api.get(`/placement-records/${id}`).then((r) => r.data),
  create: (body) => api.post("/placement-records", body).then((r) => r.data),
  update: (id, body) =>
    api.put(`/placement-records/${id}`, body).then((r) => r.data),
  delete: (id) => api.delete(`/placement-records/${id}`).then((r) => r.data),
};
