# Experiments

This directory contains experimental code, prototypes, and explorations related
to the Meetups project. It serves as a sandbox for trying out new ideas,
features, and technologies before they are integrated into the main codebase.

**Purpose:**

- **Proof of Concept:** Develop and test new features or approaches in
  isolation.
- **Exploration:** Investigate different libraries, frameworks, or algorithms.
- **Prototyping:** Create quick and dirty implementations to validate ideas.
- **Learning:** Experiment with new technologies and share learnings.

**Contents:**

Each experiment should reside in its own subdirectory with a descriptive name
(e.g., `image_recognition`, `new_data_format`, `alternative_ui`). Inside each
experiment directory, you should include:

- **README.md (Required):** A brief description of the experiment, its goals,
  methodology, and any relevant findings or conclusions. This should also
  include:
  - **Context:** What problem or opportunity is being addressed?
  - **Approach:** What techniques or technologies are being used?
  - **Results (if any):** What were the outcomes of the experiment?
  - **Status:** Is the experiment ongoing, completed, or abandoned?
- **Code:** The actual code for the experiment.
- **Data (if applicable):** Any data used for the experiment.

**Example Experiment Structure:**

```
experiments/
├── image_recognition/
│   ├── README.md
│   ├── image_classifier.ts
│   └── test_images/
│       ├── image1.jpg
│       └── image2.png
```

**Guidelines:**

- **Keep it contained:** Experiments should be self-contained and not rely on
  the main project's code unless absolutely necessary.
- **Document everything:** Clear documentation is crucial for understanding and
  reproducing experiments.
- **No guarantees:** Code in this directory is not guaranteed to be stable,
  well-tested, or maintained. It may be subject to frequent changes or removal.
- **Don't deploy:** Code from this directory should _not_ be deployed to
  production.
- **Consider merging successful experiments:** If an experiment proves
  successful and is deemed valuable, consider refactoring and integrating it
  into the main project codebase. This should be done through a proper pull
  request process.

**Contributing:**

Feel free to contribute new experiments. If you have an idea you want to
explore, create a new subdirectory and follow the guidelines above. Please open
an issue or pull request to discuss your proposed experiment before starting
implementation, especially if it's a larger undertaking.

**Disclaimer:**

This directory is intended for exploration and learning purposes. The code
within is provided "as is" without any warranty.

We encourage you to explore, experiment, and share your findings!
