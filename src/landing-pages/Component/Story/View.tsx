import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import hopsStory from "@/public/content/hopsStory.json";
import "./styles.css";

interface HopsStoryModalProps {
  show: boolean;
  handleClose: () => void;
}

const HopsStoryModal: React.FC<HopsStoryModalProps> = ({
  show,
  handleClose,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (show && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [show]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Hops Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="0" id="hops-story-tabs">
            {hopsStory.chapters.map((chapter, index) => (
              <Tab
                eventKey={index.toString()}
                title={chapter.header}
                key={index}
              >
                <audio ref={audioRef} src={`${chapter.audio}`} loop />
                <div className="modal-title mt-4 mb-2">{chapter.title}</div>
                {chapter.contentLines.map((line, i) => (
                  <React.Fragment key={i}>
                    <div className="mb-1">{line}</div>
                    <br />
                  </React.Fragment>
                ))}
              </Tab>
            ))}
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <div className="btn speaker-icon" onClick={toggleMute}>
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HopsStoryModal;
