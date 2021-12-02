"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./typings/enums");
var Instructions_1 = __importDefault(require("./Instructions"));
var Element = /** @class */ (function () {
    function Element(_a) {
        var tag = _a.tag, content = _a.content;
        this._content = content;
        this._instructions = [Instructions_1.default.CONTENT];
        this._log = [];
        this._style = {};
        this._tag = tag;
        // Add content to CONTENT node
        if (typeof this._content === 'string') {
            this._instructions[0].value = this._content;
        }
    }
    Object.defineProperty(Element.prototype, "instructions", {
        get: function () {
            return this._instructions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "style", {
        set: function (rules) {
            this.log('LOG', 'Setting new style rules...');
            this._style = rules;
            this.applyStyling();
            this.sortInstructions();
        },
        enumerable: false,
        configurable: true
    });
    Element.prototype.addInstruction = function (instruction) {
        this.log('INS', "Adding ".concat(instruction.name));
        this._instructions.push(instruction);
    };
    Element.prototype.applyStyling = function () {
        this.log('LOG', 'Applying styles...');
        // Background-color
        if (this._style.backgroundColor) {
            var bgStyle = Instructions_1.default.BACKGROUND_COLOR;
            bgStyle.value = enums_1.EBackground[this._style.backgroundColor];
            this.addInstruction(bgStyle);
            this.addInstruction(Instructions_1.default.SPACE_BEFORE);
            this.addInstruction(Instructions_1.default.SPACE_AFTER);
            this.findAndRemoveInstructions(Instructions_1.default.RESET);
            this.addInstruction(Instructions_1.default.RESET);
        }
        // Color
        if (this._style.color) {
            var colorStyle = Instructions_1.default.COLOR;
            colorStyle.value = enums_1.EForeground[this._style.color];
            this.addInstruction(colorStyle);
            this.findAndRemoveInstructions(Instructions_1.default.RESET);
            this.addInstruction(Instructions_1.default.RESET);
        }
        // Margin
        if (this._style.margin) {
            for (var i = 0; i < this._style.margin; i++) {
                this.addInstruction(Instructions_1.default.MARGIN_BOTTOM);
                this.addInstruction(Instructions_1.default.MARGIN_LEFT);
                this.addInstruction(Instructions_1.default.MARGIN_RIGHT);
                this.addInstruction(Instructions_1.default.MARGIN_TOP);
            }
        }
        // Margin-bottom
        if (this._style.marginBottom) {
            this.findAndRemoveInstructions(Instructions_1.default.MARGIN_BOTTOM);
            for (var i = 0; i < this._style.marginBottom; i++) {
                this.addInstruction(Instructions_1.default.MARGIN_BOTTOM);
            }
        }
        // Margin-left
        if (this._style.marginLeft) {
            this.findAndRemoveInstructions(Instructions_1.default.MARGIN_LEFT);
            for (var i = 0; i < this._style.marginLeft; i++) {
                this.addInstruction(Instructions_1.default.MARGIN_LEFT);
            }
        }
        // Margin-right
        if (this._style.marginRight) {
            this.findAndRemoveInstructions(Instructions_1.default.MARGIN_RIGHT);
            for (var i = 0; i < this._style.marginRight; i++) {
                this.addInstruction(Instructions_1.default.MARGIN_RIGHT);
            }
        }
        // Margin-top
        if (this._style.marginTop) {
            this.findAndRemoveInstructions(Instructions_1.default.MARGIN_TOP);
            for (var i = 0; i < this._style.marginTop; i++) {
                this.addInstruction(Instructions_1.default.MARGIN_TOP);
            }
        }
        // Text-transform
        if (this._style.textTransform) {
            switch (this._style.textTransform) {
                case 'capitalize':
                    this.addInstruction(Instructions_1.default.TEXT_TRANSFORM_CAPITALIZE);
                    break;
                case 'lowercase':
                    this.addInstruction(Instructions_1.default.TEXT_TRANSFORM_LOWERCASE);
                    break;
                case 'uppercase':
                    this.addInstruction(Instructions_1.default.TEXT_TRANSFORM_UPPERCASE);
                    break;
                default:
                    break;
            }
        }
    };
    Element.prototype.findAndRemoveInstructions = function (target) {
        this.log('LOG', "Find and remove ".concat(target.name, "..."));
        var newInstructions = [];
        this._instructions.map(function (instruction) {
            if (instruction.name !== target.name) {
                newInstructions.push(instruction);
            }
        });
        this._instructions = newInstructions;
    };
    Element.prototype.log = function (prefix, msg) {
        if (prefix === 'INS') {
            this._log.push("".concat(enums_1.EForeground.yellow, "[").concat(prefix, "] ").concat(msg).concat(enums_1.EUtilities.reset));
        }
        else {
            this._log.push("[".concat(prefix, "] ").concat(msg));
        }
    };
    /**
     * Parses the list of instructions and generates the final output string
     */
    Element.prototype.parseInstructions = function () {
        var _this = this;
        this.log('LOG', 'Parsing...');
        var output = [];
        // Iterate through instruction list
        this._instructions.forEach(function (instruction) {
            _this.log('PAR', "".concat(instruction.name, ": Running..."));
            if (typeof _this._content === 'string') {
                switch (instruction.name) {
                    case 'CONTENT':
                        output.push(_this._content);
                        _this.log('PAR', 'CONTENT: Success');
                        break;
                    case 'TEXT_TRANSFORM_CAPITALIZE':
                        _this._content = _this._content.split(' ').map(function (word) { return word[0].toUpperCase() + word.slice(1); }).join(' ');
                        _this.log('INS', 'TEXT_TRANSFORM_CAPITALIZE: Success');
                        break;
                    case 'TEXT_TRANSFORM_LOWERCASE':
                        _this._content = _this._content.toLowerCase();
                        break;
                    case 'TEXT_TRANSFORM_UPPERCASE':
                        _this._content = _this._content.toUpperCase();
                        break;
                    default:
                        instruction.value && output.push(instruction.value);
                        break;
                }
            }
        });
        return output.join('');
    };
    Element.prototype.print = function () {
        console.log(this.parseInstructions());
    };
    Element.prototype.showLog = function () {
        this._log.forEach(function (log) {
            console.log(log);
        });
    };
    /**
     * Sorts the list of instructions according to 'sortPriority'
     */
    Element.prototype.sortInstructions = function () {
        this.log('LOG', 'Sorting instructions...');
        this._instructions.sort(function (a, b) { return a.sortPriority > b.sortPriority ? 1 : -1; });
    };
    return Element;
}());
exports.default = Element;
