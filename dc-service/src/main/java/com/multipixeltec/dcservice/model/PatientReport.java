package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.PatientStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Field;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "PATIENT_REPORT")
public class PatientReport extends Auditable<User>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "XRAY_IMAGE")
    private String xRayImage;

    @Column(name = "PATIENT_ID", insertable = false, updatable = false)
    private Long patientId;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PATIENT_ID", referencedColumnName = "ID")
    private Patient patient;

    /*@Column(name = "EYE_VISUAL_ACUITY_LEFT", length = 15)
    private String eyeVisualAcuityLeft;

    @Column(name = "EYE_VISUAL_ACUITY_RIGHT", length = 15)
    private String eyeVisualAcuityRight;*/

    @Column(name = "EAR_LEFT", length = 15)
    private String earLeft;

    @Column(name = "EAR_RIGHT", length = 15)
    private String earRight;

    @Column(name = "BLOOD_PRESSURE", length = 15)
    private String bloodPressure;

    @Column(name = "HEART", length = 15)
    private String heart;

    @Column(name = "LUNGS", length = 15)
    private String lungs;

    @Column(name = "GASTROINTESTINAL_ABDOMEN", length = 15)
    private String gastrointestinalAbdomen;

    @Column(name = "HEIGHT", length = 15)
    private String height;

    @Column(name = "WEIGHT", length = 15)
    private String weight;

    @Column(name = "HERNIA", length = 15)
    private String hernia;

    @Column(name = "VARICOSE_VEINS", length = 15)
    private String varicoseVeins;

    @Column(name = "DEFORMITIES", length = 15)
    private String deformities;

    @Column(name = "SKIN", length = 15)
    private String skin;

    @Column(name = "CNS", length = 15)
    private String cns;

    @Column(name = "EXTREMITIES", length = 15)
    private String extremities;

    @Column(name = "PSYCHIATRY", length = 15)
    private String psychiatry;

    @Column(name = "SYMPTOMS", length = 15)
    private String symptoms;

    @Column(name = "CHEST_XRAY", length = 15)
    private String chestXray;

    @Column(name = "ECG", length = 15)
    private String ecg;

    @Column(name = "HIV", length = 15)
    private String hiv;

    @Column(name = "HBSAG", length = 15)
    private String hbsag;

    @Column(name = "THC", length = 15)
    private String thc;

    @Column(name = "MOP", length = 15)
    private String mop;

    @Column(name = "AMP", length = 15)
    private String amp;

    @Column(name = "SUGAR", length = 15)
    private String sugar;

    @Column(name = "ALBUMIN", length = 15)
    private String albumin;

    @Column(name = "URINE_BILHARZIASIS", length = 15)
    private String urineBilharziasis;

    @Column(name = "PREGNANCY", length = 15)
    private String pregnancy;

    @Column(name = "OTHERS", length = 15)
    private String others;

    @Column(name = "HELMINTHS", length = 15)
    private String helminths;

    @Column(name = "GIARDIA", length = 15)
    private String giardia;

    @Column(name = "BILHARZIASIS", length = 15)
    private String bilharziasis;

    @Column(name = "CULTURE", length = 15)
    private String culture;

    @Column(name = "STOOL_BILHARZIASIS", length = 15)
    private String stoolBilharziasis;

    @Column(name = "MALARIA", length = 15)
    private String malaria;

    @Column(name = "MICROFILARIA", length = 15)
    private String microfilaria;

    @Column(name = "BLOOD_GROUP", length = 15)
    private String bloodGroup;

    @Column(name = "HAEMOGLOBIN", length = 15)
    private String haemoglobin;

    @Column(name = "ESR", length = 15)
    private String esr;

    @Column(name = "RBS", length = 15)
    private String rbs;

    @Column(name = "CREATININE", length = 15)
    private String creatinine;

    @Column(name = "TBIL", length = 15)
    private String tbil;

    @Column(name = "SGOT", length = 15)
    private String sgot;

    @Column(name = "SGPT", length = 15)
    private String sgpt;

    @Column(name = "ALP", length = 15)
    private String alp;

    @Column(name = "UREA", length = 15)
    private String urea;

    @Column(name = "ANTIHCV", length = 15)
    private String antiHcv;

    @Column(name = "TPHA", length = 15)
    private String tpha;

    @Column(name = "VDRL", length = 15)
    private String vdrl;

    @Column(name = "PULSE", length = 10)
    private String pulse;

    @Column(name = "CLEAR_VISION", length = 10)
    private String clearVision;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", length = 15)
    private PatientStatus status;

    @Column(name = "REMARK")
    private String remark;

    @Column(name = "EXPIRE_DATE")
    private Date expireDate;

    @Column(name = "DISTANT_AIDED_RIGHT" , length = 10)
    private String distantAidedRight;

    @Column(name = "DISTANT_AIDED_LEFT", length = 10)
    private String distantAidedLeft;

    @Column(name = "DISTANT_UNAIDED_RIGHT", length = 10)
    private String distantUnaidedRight;

    @Column(name = "DISTANT_UNAIDED_LEFT", length = 10)
    private String distantUnaidedLeft;

    @Column(name = "NEAR_AIDED_RIGHT", length = 10)
    private String nearAidedRight;

    @Column(name = "NEAR_AIDED_LEFT", length = 10)
    private String nearAidedLeft;

    @Column(name = "NEAR_UNAIDED_RIGHT", length = 10)
    private String nearUnaidedRight;

    @Column(name = "NEAR_UNAIDED_LEFT", length = 10)
    private String nearUnaidedLeft;

    public boolean IsXrayAttached() {
        return check(xRayImage);
    }

    private boolean check(String value) {
        return value != null && !value.isEmpty() && !value.equalsIgnoreCase("***");
    }

    public void setDefault() {
        Field[] fields = this.getClass().getDeclaredFields();
        try {
            for (Field field : fields) {
                if (field.getType().equals(String.class) && !field.getName().equalsIgnoreCase("xRayImage")) { // if it is a String field
                    field.set(this, "***");
                }
            }
            distantAidedRight = "6/6";
            distantAidedLeft = "6/6";
            distantUnaidedRight = "6/6";
            distantUnaidedLeft = "6/6";
            nearAidedRight = "20/20";
            nearAidedLeft = "20/20";
            nearUnaidedRight = "20/20";
            nearUnaidedLeft = "20/20";
            clearVision = "NAD";
            earLeft = "NAD";
            earRight = "NAD";
            heart = "NAD";
            lungs = "CLEAR";
            hernia = "ABSENT";
            varicoseVeins = "ABSENT";
            deformities = "ABSENT";
            skin = "NORMAL";
            cns = "NAD";
            extremities = "NORMAL";
            psychiatry = "ABSENT";
            sugar = "NILL";
            albumin = "ABSENT";
            bilharziasis = "NOT FOUND";
            pregnancy = "N/A";
            helminths = "NO GROWTH";
            malaria = "NOT FOUND";
            microfilaria = "NOT FOUND";
            antiHcv = "NEGATIVE";
            tpha = "NEGATIVE";
            vdrl = "NON REACTIVE";
            hiv = "NEGATIVE";
            hbsag = "NEGATIVE";
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

    }
}
