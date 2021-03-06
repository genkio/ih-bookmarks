import {
  IonAlert,
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  chevronForwardCircleOutline,
  linkOutline,
  trashBinOutline,
} from "ionicons/icons";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import { Bookmark } from "../typing";
import { TagGroup } from "./tag-group";

const cursorStyle = { cursor: "pointer" };

export const BookmarkCard: React.FC<{
  bookmark: Bookmark;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ bookmark, onDelete, onEdit }) => {
  const { tags, title, url } = bookmark;

  const [showAction, setShowAction] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const alertActions = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Delete",
      handler: onDelete,
    },
  ];

  const content = bookmark.content?.split(" ").slice(0, 20).join(" ");
  const formattedContent = content ? content + "..." : "No content";

  return (
    <IonCard
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
    >
      <IonAlert
        isOpen={confirmDelete}
        onDidDismiss={() => setConfirmDelete(false)}
        header={"Delete bookmark"}
        message={"Shall we continue?"}
        buttons={alertActions}
      />
      <IonCardHeader>
        <IonRow className="ion-justify-content-between">
          <div className="ion-align-items-center" style={{ display: "flex" }}>
            <IonBadge className="ion-text-capitalize" color="dark">
              {bookmark.type}
            </IonBadge>
          </div>
          {showAction && (
            <div>
              <IonIcon
                color="danger"
                icon={trashBinOutline}
                onClick={() => setConfirmDelete(true)}
                style={{ ...cursorStyle, marginRight: 10 }}
              />
              <IonIcon
                icon={chevronForwardCircleOutline}
                onClick={onEdit}
                style={cursorStyle}
              />
            </div>
          )}
        </IonRow>
        <IonCardTitle
          onClick={() => browser.tabs.create({ active: false, url })}
          style={{ ...cursorStyle, fontSize: "1.15rem" }}
        >
          {formattedContent}
          <IonIcon icon={linkOutline} size="small" style={{ marginLeft: 5 }} />
        </IonCardTitle>
        <IonRow style={{ marginTop: 7.5 }}>
          <IonText>{title}</IonText>
        </IonRow>
      </IonCardHeader>

      <TagGroup tags={tags} />
    </IonCard>
  );
};
