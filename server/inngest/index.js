import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "digi-market" });

// inngest function to save user to db
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const { data } = event;
    console.log(data);

    // check if user already exists in db
    const user = await prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (user) {
      // update user data if exist
      await prisma.user.update({
        where: { id: data.id },
        data: {
          email: data.email_addresses[0]?.email_address,
          name: data?.fist_name + "" + data?.last_name,
          image: data?.image_url,
        },
      });

      return;
    }

    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0]?.email_address,
        name: data?.fist_name + "" + data?.last_name,
        image: data?.image_url,
      },
    });
  },
);

// inngest function to delete user from db
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const { data } = event;
    console.log(data);

    const listings = await prisma.listing.findMany({
      where: { ownerId: data.id },
    });

    const chats = await prisma.chat.findMany({
      where: { OR: [{ ownerUserId: data.id }, { chatUserId: data.id }] },
    });
    const transactions = await prisma.transaction.findMany({
      where: { userId: data.id },
    });

    if (
      listings.length === 0 &&
      chats.length === 0 &&
      transactions.length === 0
    ) {
      await prisma.user.delete({
        where: { id: data.id },
      });
    } else {
      await prisma.listing.updateMany({
        where: { ownerId: data.id },
        data: { status: "inactive" },
      });
    }
  },
);

// inngest function to update user from db
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    const { data } = event;
    console.log(data);

    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0]?.email_address,
        name: data?.fist_name + "" + data?.last_name,
        image: data?.image_url,
      },
    });
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
