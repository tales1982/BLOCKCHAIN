"use client";
import { createContext } from "react";
import React from "react";
import { Content, Status, Img } from "./styles";

const CampaignCard = ({ campaign = {} }) => {
  const shortDescription = campaign.description
    ? campaign.description.length > 400
      ? `${campaign.description.substring(0, 400)}...`
      : campaign.description
    : "No description available";

  return (
    <Content>
      <h2>{campaign.title || "Untitled Campaign"}</h2>
      <p>{shortDescription}</p>
      <Img
        src={campaign.imageUrl || "https://via.placeholder.com/300x200"}
        alt={campaign.title || "Campaign Image"}
      />
      <Status active={campaign.active}>
        {campaign.active ? "Active" : "Inactive"}
      </Status>
    </Content>
  );
};

export default CampaignCard;

