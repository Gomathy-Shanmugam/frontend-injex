import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";


type PredefinedPoint = {
  label: string;
  points: number;
};

interface Props {
  show: boolean;
  onHide: () => void;
  onAddCategory: (
  newLabel: string,
  newPoint: number,
  descriptions: string[]
) => void;
  existingPoints: number[];
  criteriaCount: number;
  predefinedPoints: { label: string; points: number }[];
  setPredefinedPoints: React.Dispatch<
    React.SetStateAction<{ label: string; points: number }[]>
  >;
}

const NewCategoryModal: React.FC<Props> = ({
  show,
  onHide,
  onAddCategory,
  existingPoints,
  criteriaCount,
  predefinedPoints,
  setPredefinedPoints,
}) => {
  const [label, setLabel] = useState("");
  const [points, setPoints] = useState<number>(0);
  const [descriptions, setDescriptions] = useState<string[]>(
    Array(criteriaCount).fill("")
  );
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [predefinedError, setPredefinedError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const criteriaLabels = [
    "Content Quality",
    "Creativity",
    "Presentation & Structure",
  ];


  const [localPredefined, setLocalPredefined] = useState<PredefinedPoint[]>(
  JSON.parse(JSON.stringify(predefinedPoints)) // deep copy to avoid mutation
);
 
  // const validatePoints = (
  //   val: number,
  //   latestPredefined: { label: string; points: number }[] = predefinedPoints
  // ): string | null => {
  //   if (val < 1 || val > 11) {
  //     return "Points must be between 1 and 11.";
  //   }

  //   const used = Array.from(
  //     new Set([...latestPredefined.map((p) => p.points), ...existingPoints])
  //   );

  //   if (used.includes(val)) {
  //     return `This point value (${val}) is already used. Please choose a different value.`;
  //   }

  //   return null;
  // };

const validatePoints = (
  val: number,
  latestPredefined: { label: string; points: number }[] = predefinedPoints
): string | null => {
  const used = Array.from(new Set(latestPredefined.map((p) => p.points)));

  console.log("✅ CLEAN VALIDATION DEBUG", {
    input: val,
    usedPoints: used,
  });

  if (val < 1 || val > 11) {
    return "Points must be between 1 and 11.";
  }

  if (used.includes(val)) {
    return `This point value (${val}) is already used.`;
  }

  return null;
};



 const handlePointsChange = (val: number) => {
  setPoints(val);
  const validation = validatePoints(val, localPredefined); // ✅ FIXED
  setCategoryError(validation);
};



// const handlePredefinedChange = (index: number, newValue: number) => {
//   if (!predefinedPoints[index]) return; // guard against undefined index

//   if (newValue < 1 || newValue > 11) {
//     setPredefinedError("Points must be between 1 and 11.");
//     return;
//   }

//   const isDuplicate =
//     predefinedPoints.some(
//       (item, i) => i !== index && item.points === newValue
//     ) || existingPoints.includes(newValue);

//   if (isDuplicate) {
//     setPredefinedError("This point is already used. Please choose another.");
//     return;
//   }

//   // const updated = [...predefinedPoints];
//   const updated = [...localPredefined];

//   updated[index] = { ...updated[index], points: newValue }; // safer assignment
//   setLocalPredefined(updated); 
//   setPredefinedError(null);

//   if (points > 0) {
//     const validation = validatePoints(points, updated);
//     setCategoryError(validation);
//   }
// };
const handlePredefinedChange = (index: number, newValue: number) => {
  if (!localPredefined[index]) return;

  const updated = [...localPredefined];
  updated[index] = { ...updated[index], points: newValue };

  setLocalPredefined(updated); // ✅ always allow UI update

  if (newValue < 1 || newValue > 11) {
    setPredefinedError("Points must be between 1 and 11.");
    return;
  }

  const values = updated.map((p) => p.points);
  const isDuplicate = values.filter((v) => v === newValue).length > 1 || existingPoints.includes(newValue);

  if (isDuplicate) {
    setPredefinedError("This point is already used. Please choose another.");
  } else {
    setPredefinedError(null);
  }

  // Optional: also validate main "points" input if it's active
  if (points > 0) {
    const validation = validatePoints(points, updated);
    setCategoryError(validation);
  }
};


const handleSubmit = () => {
  if (categoryError || predefinedError) return;

  const validation = validatePoints(points, localPredefined); // ✅ FIXED
  if (validation) {
    setCategoryError(validation);
    return;
  }

  onAddCategory(label, points, descriptions);
  // setPredefinedPoints(localPredefined); // Optional: update parent



  // Reset
  setLabel("");
  setPoints(0);
  setDescriptions(Array(criteriaCount).fill(""));
  setCategoryError(null);
  setPredefinedError(null);
  onHide();
};





  return (
    <>
  
    
    {show && <div className="custom-blur-overlay"></div>}

    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "16px" }}>New Category</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: "14px" }}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "16px" }}>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "16px" }}>Points</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={11}
            placeholder="Enter unique point (1–11)"
            value={points === 0 ? "" : points}
            onChange={(e) => handlePointsChange(Number(e.target.value))}
            isInvalid={!!categoryError}
            style={{ fontSize: "14px" }}
          />
          {categoryError && (
            <Form.Text className="text-danger" style={{ fontSize: "13px" }}>
              {categoryError}
            </Form.Text>
          )}
        </Form.Group>

        <div className="mb-3">
          <strong className="d-block mb-2" style={{ fontSize: "16px" }}>
            Pre-Defined Points
          </strong>
          {predefinedError && (
            <div className="text-danger mb-2" style={{ fontSize: "13px" }}>
              {predefinedError}
            </div>
          )}
          <div className="row">
            {localPredefined.map((item, index) => (
              <div className="col-6 mb-3" key={item.label}>
                <Form.Label
                  className="fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  {item.label}
                </Form.Label>
                <Form.Control
                  type="number"
                  value={item.points}
                  onChange={(e) =>
                    handlePredefinedChange(index, Number(e.target.value))
                  }
                  style={{ fontSize: "14px" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <strong style={{ fontSize: "16px" }}>
            Descriptions for Criteria
          </strong>
          {descriptions.map((desc, idx) => (
            <Form.Group className="mb-2" key={idx}>
              <Form.Label style={{ fontSize: "14px" }}>
                {criteriaLabels[idx] || `Criteria ${idx + 1}`}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={desc}
                onChange={(e) => {
                  const updated = [...descriptions];
                  updated[idx] = e.target.value;
                  setDescriptions(updated);
                }}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{ fontSize: "14px" }}
        >
          Cancel
        </Button>
        <Button
          variant="warning"
          onClick={handleSubmit}
          style={{ fontSize: "14px" }}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
      </>
  );
};

export default NewCategoryModal;
