import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
} from "../utils/wallet";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import config from "../config";
import { TezButton } from "./TezButton";
import Button, { ButtonLink } from "./Button";

const TezLink = ({ faIcon, href, text, children, ...extra }) => {
  return (
    <div className="relative group inline-block ml-4 text-white">
      <div
        className={`bg-blue-300 transform w-full h-full top-2 -left-2 absolute transition-all`}
      ></div>
      <a
        href={href}
        target={"_blank"}
        rel={"noreferrer"}
        className={`bg-blue-500 inline-block ${extra?.padding} ${extra?.textSize} rounded-sm relative group-active:-left-2 group-active:top-2 transition-all hover:bg-blue-600`}
      >
        {faIcon && (
          <FontAwesomeIcon icon={faIcon} className={`${text && "mr-2"}`} />
        )}
        {text && <span>{text}</span>}
      </a>
    </div>
  );
};

export default function Navbar() {
  const [wallet, setWallet] = useState(null);

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
  };

  useEffect(() => {
    const func = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWallet(account.address);
      }
    };
    func();
  }, []);

  return (
    <nav
      className="fixed w-full top-0 left-0 z-40"
      style={{ backgroundColor: "#f4f4f4E0", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center px-4 sm:px-10 justify-between h-20">
        <div className="flex-1 space-x-4 flex items-center">
          <a
            href="#!"
            className="font-bold text-gray-900 pr-2 text-xl sm:text-2xl"
          >
            <FontAwesomeIcon
              icon={faImagePortrait}
              className="mr-2 text-red-500"
            />
            <span>
              Make My <span className="text-red-500">NFT</span>
            </span>
          </a>
        </div>

        <div className="flex items-center sm:space-x-4">
          <ButtonLink href={config.twitter} faIcon={faTwitter} />
          <ButtonLink faIcon={faDiscord} href={config.discord} />
          <Button
            onClick={wallet ? handleDisconnectWallet : handleConnectWallet}
            faIcon={faWallet}
            text={
              wallet
                ? wallet.slice(0, 4) +
                  "..." +
                  wallet.slice(wallet.length - 4, wallet.length)
                : "Sync"
            }
          />
        </div>
      </div>
    </nav>
  );
}