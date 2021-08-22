/* eslint-disable @typescript-eslint/no-explicit-any */
import {css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult,} from 'lit';
import {customElement, property, state} from "lit/decorators";
import {
    ActionHandlerEvent,
    getLovelace,
    handleAction,
    hasAction,
    hasConfigOrEntityChanged,
    HomeAssistant,
    LovelaceCardEditor,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import './editor';

import type {AirparifCardConfig} from './types';
import {actionHandler} from './action-handler-directive';
import {AIRPARIF_ICON_MAP, AIRPARIF_VALUE_MAP, CARD_VERSION} from './const';
import {localize} from './localize/localize';

/* eslint no-console: 0 */
console.info(
    `%c  AIRPARIF-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'airparif-card',
    name: 'Airparif',
    description: localize("common.description"),
});

@customElement('airparif-card')
export class AirparifCard extends LitElement {
    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        return document.createElement('airparif-card-editor');
    }

    public static getStubConfig(): object {
        return {};
    }

    // https://lit-element.polymer-project.org/guide/properties
    @property({attribute: false}) public hass!: HomeAssistant;
    @state() private config!: AirparifCardConfig;

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
    public setConfig(config: AirparifCardConfig): void {
        if (!config) {
            throw new Error(localize('common.invalid_configuration'));
        }

        if (config.test_gui) {
            getLovelace().setEditMode(true);
        }

        // TODO Improve configuration checks
        if (!config.entity || config.entity.indexOf("sensor.airparif_") == -1) {
            throw new Error("You need to define an entity that is an Airparif sensor");
        }

        this.config = {
            ...config
        };
    }

    // https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this.config) {
            return false;
        }

        return hasConfigOrEntityChanged(this, changedProps, false);
    }

    private _renderClass(value: string): string {
        return (value in AIRPARIF_VALUE_MAP) ? AIRPARIF_VALUE_MAP[value] : "none";
    }

    private _renderValue(value: string): TemplateResult {
        const divClass = this._renderClass(value);
        return html`
            <div class="airparif-${divClass}">${localize("presentation." + value)}</div>
        `;
    }

    private _renderIcon(value: string): TemplateResult {
        if (!(value in AIRPARIF_ICON_MAP)) {
            return html``;
        } else {
            return html`
                <ha-icon icon="${AIRPARIF_ICON_MAP[value]}"></ha-icon>
            `;
        }
    }

    // https://lit-element.polymer-project.org/guide/templates
    protected render(): TemplateResult | void {
        if (!this.config.entity) {
            return html`<p>No entity defined</p>`;
        }

        const state = this.hass.states[this.config.entity];

        if (!state.attributes || !state.attributes.today || !state.attributes.today.aqi || !state.attributes.today.date || !state.attributes.today.ozone || !state.attributes.today.pm_10 || !state.attributes.today.pm_2_5 || !state.attributes.today.nitrogen_dioxide || !state.attributes.today.sulfur_dioxide) {
            return this._showWarning(localize('common.show_warning'));
        }

        const divClass = this._renderClass(state.attributes.today.aqi);

        return html`
            <ha-card
                    .header=${localize("common.header")}
                    @action=${this._handleAction}
                    .actionHandler=${actionHandler({
                        hasHold: hasAction(this.config.hold_action),
                        hasDoubleClick: hasAction(this.config.double_tap_action),
                    })}
                    tabindex="0"
                    .label=${`Airparif: ${this.config.entity}`}
                    >
                <p class="airparif-date">${state.attributes.today.date}</p>
                <div class="card">
                    <table>
                        <tr>
                            <td class="airparif-${divClass} first-column" rowspan="5" id="airparif-aqi">
                                ${this._renderIcon(state.attributes.today.aqi)}
                                <br>${this._renderValue(state.attributes.today.aqi)}
                            </td>
                            <td class="second-column">${localize("air_quality.ozone")}</td>
                            <td class="third-column">${this._renderValue(state.attributes.today.ozone)}</td>
                        </tr>
                        <tr>
                            <td class="second-column">${localize("air_quality.nitrogen_dioxide")}</td>
                            <td class="third-column">${this._renderValue(state.attributes.today.nitrogen_dioxide)}</td>
                        </tr>
                        <tr>
                            <td class="second-column">${localize("air_quality.pm_10")}</td>
                            <td class="third-column">${this._renderValue(state.attributes.today.pm_10)}</td>
                        </tr>
                        <tr>
                            <td class="second-column">${localize("air_quality.pm_2_5")}</td>
                            <td class="third-column">${this._renderValue(state.attributes.today.pm_2_5)}</td>
                        </tr>
                    </table>
                </div>
            </ha-card>
        `;
    }

    private _handleAction(ev: ActionHandlerEvent): void {
        if (this.hass && this.config && ev.detail.action) {
            handleAction(this, this.hass, this.config, ev.detail.action);
        }
    }

    private _showWarning(warning: string): TemplateResult {
        return html`
      <hui-warning>${warning}</hui-warning>
    `;
    }

    // https://lit-element.polymer-project.org/guide/styles
    static get styles(): CSSResultGroup {
      return css`
      airparif-card {
        position: relative;
      }
      .card {
        margin: auto;
        padding: 0em 1em 1em 1em;
        position: relative;
        cursor: pointer;
        display: flex;
      }
      .card-header {
        padding-bottom: 0em;
      }
      .card table {
        flex: 1;
        text-align: center;
        vertical-align: center;
      }
      .airparif-date {
        position: absolute;
        top: 12px;
        right: 1em;
      }
      #airparif-aqi div {
        height:100%;
        overflow: auto;
      }
      td.first-column {
        width: 40%;
      }
      td.second-column {
        width: 20%;
        text-align:right;
      }
      td.third-column {
        width: 40%;
      }
      .airparif-none {
        background-color:#ffffff;
        color: #000000;
        font-weight: bold;
      }
      .airparif-good {
        background-color:#A8E05F;
        color: #718B3A;
        font-weight: bold;
      }
      .airparif-average {
        background-color:#FDD74B;
        color: #A57F23;
        font-weight: bold;
      }
      .airparif-degraded {
        background-color:#FE9B57;
        color:#B25826;
        font-weight: bold;
      }
      .airparif-bad {
        background-color:#FE6A69;
        color:#AF2C3B;
        font-weight: bold;
      }
      .airparif-very_bad {
        background-color:#A97ABC;
        color:#634675;
        font-weight: bold;
      }
      .airparif-extremely_bad {
        background-color:#A5516B;
        color:#683E51;
        font-weight: bold;
      }`;
    }
}
