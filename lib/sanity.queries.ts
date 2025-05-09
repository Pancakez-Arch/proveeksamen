import { client } from "@/sanity/lib/client"

export async function getEmployees() {
  const query = `*[_type == "employee"] {
    _id,
    name,
    position,
    "imageUrl": image.asset->url,
    bio
  }`
  
  return client.fetch(query)
}

export async function getEquipment() {
  const query = `*[_type == "equipment"] {
    _id,
    name,
    category,
    description,
    "imageUrl": image.asset->url,
    price,
    specifications,
    available,
    quantity
  }`
  
  return client.fetch(query)
}