"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Ces données devraient venir d'une API dans une vraie application
const classes = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"];
const ecs = [
  "Mathématiques",
  "Physique",
  "Informatique",
  "Anglais",
  "Économie",
];
const ues = ["UE1", "UE2", "UE3", "UE4", "UE5"];

export default function OnboardingUniversite() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    classes: [],
    ecs: [],
    ues: {},
  });

  const steps = [
    { title: "Sélection des classes", component: SelectionClasses },
    { title: "Sélection des EC", component: SelectionEC },
    { title: "Sélection des UE", component: SelectionUE },
    { title: "Confirmation", component: Confirmation },
  ];

  const CurrentStep = steps[step].component;

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSave = () => {
    // Ici, vous implémenteriez la logique pour sauvegarder les sélections
    console.log("Sélections sauvegardées:", selections);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
        </DialogHeader>
        <Progress
          value={(step / (steps.length - 1)) * 100}
          className="w-full"
        />
        <CurrentStep selections={selections} setSelections={setSelections} />
        <div className="flex justify-between mt-4">
          <Button onClick={prevStep} disabled={step === 0}>
            Précédent
          </Button>
          {step === steps.length - 1 ? (
            <Button onClick={handleSave}>Terminer</Button>
          ) : (
            <Button onClick={nextStep}>Suivant</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SelectionClasses({ selections, setSelections }) {
  return (
    <div className="space-y-4">
      <p>Sélectionnez les classes dans lesquelles vous interviendrez :</p>
      {classes.map((classe) => (
        <div key={classe} className="flex items-center space-x-2">
          <Checkbox
            id={classe}
            checked={selections.classes.includes(classe)}
            onCheckedChange={(checked) => {
              setSelections((prev) => ({
                ...prev,
                classes: checked
                  ? [...prev.classes, classe]
                  : prev.classes.filter((c) => c !== classe),
              }));
            }}
          />
          <label htmlFor={classe}>{classe}</label>
        </div>
      ))}
    </div>
  );
}

function SelectionEC({ selections, setSelections }) {
  return (
    <div className="space-y-4">
      <p>Sélectionnez les EC dans lesquels vous interviendrez :</p>
      {ecs.map((ec) => (
        <div key={ec} className="flex items-center space-x-2">
          <Checkbox
            id={ec}
            checked={selections.ecs.includes(ec)}
            onCheckedChange={(checked) => {
              setSelections((prev) => ({
                ...prev,
                ecs: checked
                  ? [...prev.ecs, ec]
                  : prev.ecs.filter((c) => c !== ec),
                ues: checked
                  ? { ...prev.ues, [ec]: [] }
                  : Object.fromEntries(
                      Object.entries(prev.ues).filter(([key]) => key !== ec)
                    ),
              }));
            }}
          />
          <label htmlFor={ec}>{ec}</label>
        </div>
      ))}
    </div>
  );
}

function SelectionUE({ selections, setSelections }) {
  return (
    <div className="space-y-4">
      {selections.ecs.map((ec) => (
        <div key={ec}>
          <p>Sélectionnez les UE pour {ec} :</p>
          <Select
            value={selections.ues[ec]}
            onValueChange={(value) => {
              setSelections((prev) => ({
                ...prev,
                ues: {
                  ...prev.ues,
                  [ec]: value,
                },
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez les UE" />
            </SelectTrigger>
            <SelectContent>
              {ues.map((ue) => (
                <SelectItem key={ue} value={ue}>
                  {ue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}

function Confirmation({ selections }) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Résumé de vos sélections :</h3>
      <div>
        <p className="font-semibold">Classes :</p>
        <ul className="list-disc list-inside">
          {selections.classes.map((classe) => (
            <li key={classe}>{classe}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold">EC et UE :</p>
        <ul className="list-disc list-inside">
          {selections.ecs.map((ec) => (
            <li key={ec}>
              {ec} - UE : {selections.ues[ec] || "Aucune UE sélectionnée"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
