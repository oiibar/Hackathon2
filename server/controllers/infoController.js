import { infos } from "../models/store.js";

export const addInfo = (req, res) => {
  const { info, username } = req.body;
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const existingInfos = infos.list();
  for (let inf of existingInfos) {
    if (inf.username === username && inf.info === info) {
      res.json("Info already exists");
      return;
    }
  }
  infos.create({ info, username });
  res.json({ info, username });
};
