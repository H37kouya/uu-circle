import { axiosInstance } from ".";
import { Circle, CreateCircle } from "./types";

export const createCircle = async (circle: CreateCircle, accessToken: string) => {
    const { data } = await axiosInstance.post('/admin/api/circle', {
        name: circle.name,
        slug: circle.slug,
        release: false
    } as CreateCircle, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}

export const getCircleList = async (accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: Circle[]
    }>('/admin/api/circle', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}

export const showCircle = async (id: number, accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: Circle
    }>(`/admin/api/circle/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}

export const updateCircle = async (id: number, circle: Circle, accessToken: string) => {
    const { data } = await axiosInstance.put<{
        data: Circle
    }>(`/admin/api/circle/${id}`, circle, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}